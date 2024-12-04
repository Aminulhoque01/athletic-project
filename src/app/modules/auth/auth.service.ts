import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwthelpers';
// import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //creating instance of User
  // const user = new User()

  //access to our instance methods
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //match password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Password is incorrect or password do not match !!'
    );
  }

  //creating access token & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const accessToken = jwtHelpers.creteToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshToken = jwtHelpers.creteToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // console.log(accessToken,refreshToken,needsPasswordChange)

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, role } = verifiedToken;
  //checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token

  const newAccessToken = jwtHelpers.creteToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { oldPassword, newPassword } = payload;

  //checking is user exist
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  // console.log(isUserExist)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds as string))

  // const query = {id: user?.userId};
  // const updateData ={
  //   password: newHashedPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date()
  // }

  // // update password
  // await User.findOneAndUpdate(query,updateData)

  //data update
  isUserExist.needsPasswordChange = false;
  //line ta hobe => isUserExist.password = newPassword
  //updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
