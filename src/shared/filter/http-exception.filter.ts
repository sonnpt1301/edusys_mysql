import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.getResponse()['message'] || null
        : 'INTERNAL_SERVER_ERROR';

    const errorResponse = {
      method: request.method,
      path: request.url,
      statusCode: status,
      message: message,
      timestamp: moment().format(),
    };

    return response.status(status).json(errorResponse);
  }
}
