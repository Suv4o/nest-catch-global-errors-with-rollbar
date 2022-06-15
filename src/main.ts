import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RollbarConfig } from './config/rollbar.config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rollbar = app.get(RollbarConfig);
  app.useGlobalFilters(new AllExceptionsFilter(rollbar));
  await app.listen(3002);
}
bootstrap();
