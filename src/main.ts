import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', // In production, specify exact domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Packet Tracking API')
    .setDescription('API for tracking packages with real-time location updates')
    .setVersion('1.0')
    .addTag('packets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server Packet Tracking started on http://localhost:${port}`);
  console.log(
    `📚 Swagger API documentation available at http://localhost:${port}/api`,
  );
}
bootstrap();
