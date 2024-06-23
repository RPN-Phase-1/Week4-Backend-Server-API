import moment from 'moment';
import Config from '../../src/config/config';
import TokenService from '../../src/services/generateToken';
import { userOne, userAdmin } from './user.fixture';
import TokenTypes from '../../src/config/tokens';

const accessTokenExpires = moment().add(Config.jwt.accessExpirationMinutes, 'minutes');
export const userOneAccessToken = TokenService.generate(userOne.id, accessTokenExpires, TokenTypes.ACCESS);
export const adminAccessToken = TokenService.generate(userAdmin.id, accessTokenExpires, TokenTypes.ACCESS);
export const createFakeToken = (id: string) => TokenService.generate(id, accessTokenExpires, TokenTypes.ACCESS);
