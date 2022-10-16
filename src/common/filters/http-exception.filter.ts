import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception filter');
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { statusCode, message, error } = (exception.getResponse() ?? {}) as {
      statusCode: number;
      message: string;
      error: string;
    };

    if (!statusCode) {
      response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Internal Server Error',
        error: 'Internal Server Error',
      });
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error,
    });
  }
}
