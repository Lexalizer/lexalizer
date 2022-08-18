import { SetMetadata } from '@nestjs/common';

export const NO_DEFAULT_AUTH = 'noDefaultAuth';
export const NoDefaultAuth = () => SetMetadata(NO_DEFAULT_AUTH, true);
