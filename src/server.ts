import 'reflect-metadata';
import { config } from 'dotenv-flow';
config({ silent: true });

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { StatusCodes } from 'http-status-codes';

import './database';
import { HttpException } from './errors/HttpException';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HttpException) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => console.log('Server running 🚀'));
