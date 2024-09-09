import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('ConvertaX API')
    .setDescription('Backend Challenge API')
    .setVersion('1.0')
    .addTag('by DiegoLucas')
    .build();
  app.enableCors();
  app.setGlobalPrefix('/gitwave/api/v1');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/convertax/api/v1/docs', app, document);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
