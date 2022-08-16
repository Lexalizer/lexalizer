import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigurationService } from './config/config.service';

async function bootstrap() {
  await ConfigurationService.initializeEnvironment();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get(ConfigService);
  await app.listen(
    configService.get<number>('PORT'),
    configService.get<string>('LISTENING_ADDRESS')
  );
}
bootstrap();
