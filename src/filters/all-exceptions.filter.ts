import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RollbarConfig } from '../config/rollbar.config';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly rollbar: RollbarConfig) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const logger = new Logger(request.url);
    const rollbar = this.rollbar.setup();

    logger.error({ exception, stack: exception.stack });
    rollbar.error({ exception, stack: exception.stack }, request.url);

    response.status(status).json({
      ...exception['response'],
    });
  }
}
