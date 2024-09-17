import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'
import { AUTH_TOKEN_HEADER } from 'src/constants';
import { timingSafeEqual, createHmac} from 'crypto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  verifyToken(token: string, user_id: string) {
    const tokenBuffer = Buffer.from(token, 'hex');
    const salt = tokenBuffer.subarray(0, 32);
    const receivedHash = tokenBuffer.subarray(32);

    const user_id_in_bytes = Buffer.from(user_id, 'utf-8');
    const combined = Buffer.concat([salt, user_id_in_bytes]);

    const hmac = createHmac('sha256', Buffer.from(process.env.SECRET_KEY));
    hmac.update(combined);
    const calculatedHash = hmac.digest();

    return timingSafeEqual(receivedHash, calculatedHash);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token  = request.headers[AUTH_TOKEN_HEADER] as string;

    const user_id = request.body.user_id;
    if (!token || !user_id) return false;

    return this.verifyToken(token, user_id);
  }
}
