import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally for DTOs and input validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform payload to DTO instances
      whitelist: true, // Remove properties not defined in the DTO
      forbidNonWhitelisted: true, // Optional: Reject properties not in the DTO
    }),
  );

  await app.listen(3000); // The app will listen on port 3000
}

bootstrap();
