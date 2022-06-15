import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RollbarConfig } from 'src/config/rollbar.config';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = null;
  constructor(private readonly rollbar: RollbarConfig) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger = new Logger(request.url);
    const rollbar = this.rollbar.setup();

    this.logger.error({ exception, stack: exception.stack });
    rollbar.error({ exception, stack: exception.stack }, request.url);

    response.status(status).json({
      ...exception['response'],
    });
  }
}