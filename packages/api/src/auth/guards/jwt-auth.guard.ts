import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NO_DEFAULT_AUTH } from '../auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const noDefaultAuth = this.reflector.getAllAndOverride<boolean>(
      NO_DEFAULT_AUTH,
      [context.getHandler(), context.getClass()]
    );
    if (noDefaultAuth) {
      //disable default auth if decorated with @NoDefaultAuth(), for any public routes + login
      return true;
    }
    return super.canActivate(context);
  }
}
