import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.Port || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  console.log(process.env.NODE_ENV);

  await app.listen(PORT, () => {
    console.log(`Server had been started on ${PORT} port`);
  });
}
bootstrap();
