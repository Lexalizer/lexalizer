import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      validationOptions: { allowUnkown: false }
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
