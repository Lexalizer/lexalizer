import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigurationService } from './configuration/configuration.service';

async function bootstrap() {
  await ConfigurationService.initializeEnvironment();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lexalizer API')
    .setDescription('The Lexalizer API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, swaggerDocument);

  const configService = app.get(ConfigService);
  await app.listen(
    configService.get<number>('PORT'),
    configService.get<string>('LISTENING_ADDRESS')
  );
}
bootstrap();
