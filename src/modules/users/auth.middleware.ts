
import { ExpressMiddleware, HttpException, HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import { secret } from '../../constants';
import * as jwt from 'jsonwebtoken';
@Middleware()
export class AuthMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                throw new HttpException({err: 'Sesión Expirada.'}, HttpStatus.UNAUTHORIZED);
            } else {
                req.decoded = decoded;
                next();
            }
        });
      } else {
        throw new HttpException({err: "Sin Permisos"}, HttpStatus.UNAUTHORIZED);
      }
    };
  }
}
