const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const { tokenTypes } = require('../config/tokens');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await prisma.token.findFirst({
    where: { token, type, userId: payload.sub, blacklisted: false },
  });

  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Refresh access token using refresh token
 * @param {string} refreshToken
 * @returns {Promise<string>} New access token
 */
const refreshTokens = async (token) => {
  const decoded = jwt.verify(token, config.jwt.secret);

  const tokenDoc = await prisma.token.findFirst({
    where: {
      userId: decoded.sub,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    },
  });

  if (!tokenDoc) throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  if (tokenDoc.blacklisted) throw new ApiError(httpStatus.BAD_REQUEST, 'Token is blacklisted');
  if (moment().isBefore(tokenDoc.expires)) throw new ApiError(httpStatus.BAD_REQUEST, 'Token is not expired');

  const user = await prisma.user.findFirst({ where: { id: tokenDoc.sub } });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const newToken = await generateAuthTokens(user);
  return newToken;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  refreshTokens,
};
