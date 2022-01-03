import { verify } from 'jsonwebtoken';

import authConfig from '../configs/authConfig';

export default function enduredAuthentication(request, response, next) {
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
