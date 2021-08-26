const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/authConfig');

function enduredAuthentication(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new Error('token is missing!');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, authConfig.jwt.secret);

    request.user_id = sub;

    return next();
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = enduredAuthentication;
