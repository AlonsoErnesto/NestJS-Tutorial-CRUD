import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap')

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('RESTFul Api - Teslo')
  .setDescription('Teslo shop endpoints')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
  logger.log('App running on port 3000')
}
bootstrap();
