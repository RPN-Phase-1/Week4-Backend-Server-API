import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import UserService from './user';
import ApiError from '../lib/utils/ApiError';

export default class AuthService {
  public static async login(email: string, password: string) {
    const user = await UserService.getEmail(email);
    const validPassword = await bcrypt.compare(password, user?.password || '');

    if (!user || !validPassword) throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    return user;
  }
}
