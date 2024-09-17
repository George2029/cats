import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'
import { AUTH_TOKEN_HEADER } from 'src/constants';
import { timingSafeEqual, createHmac} from 'crypto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  verifyToken(token: string) {
    const tokenBuffer = Buffer.from(token, 'hex');

    const salt = tokenBuffer.subarray(0, 32);
    const user_id_length = tokenBuffer[32];
    const user_id_in_bytes = tokenBuffer.subarray(33, 33 + user_id_length);

    const receivedHash = tokenBuffer.subarray(33 + user_id_length);

    const combined = Buffer.concat([salt, Buffer.from([user_id_length]), user_id_in_bytes]);

    const hmac = createHmac('sha256', Buffer.from(process.env.SECRET_KEY));
    hmac.update(combined);
    
    const calculatedHash = hmac.digest();

    const user_id = user_id_in_bytes.toString('utf-8');
    if (!timingSafeEqual(receivedHash, calculatedHash)) {
      console.log('Invalid hash');
      return null;
    }

    return user_id;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token  = request.headers[AUTH_TOKEN_HEADER] as string;

    if (!token) return false;

    let user_id: string;
    try {
      user_id = this.verifyToken(token);
    } catch (err) {
      console.log('Error verifying token:', err);
      return false;
    }

    if (!user_id) return false;

    request.body.user_id = user_id;

    return true;
  }
}
