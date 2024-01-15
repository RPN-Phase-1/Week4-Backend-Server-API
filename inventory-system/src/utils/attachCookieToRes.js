const attachCookiesToResponse = ({ res, tokens }) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', tokens, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = { attachCookiesToResponse };
