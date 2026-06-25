import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 👈 Añadido para Swagger
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Class validator global (Tu configuración existente)
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de los metadatos de Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  // Generación e inicialización de la interfaz de Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👈 Creará la ruta http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();