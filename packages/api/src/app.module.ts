import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScrapesController } from './scrapes/scrapes.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule],
  controllers: [AppController, ScrapesController]
})
export class AppModule {}