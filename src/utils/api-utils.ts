import { HasMessage, TResultError, TResultSuccess } from '@common';
import axios, { AxiosError } from 'axios';
import { hasMessage } from './validate-utils';

/** Create a `TResultError` with error message and timestamp */
export function ResultError(message: string): TResultError {
  return {
    type: 'error',
    error: { message },
    timestamp: new Date().toISOString(),
    data: null,
  };
}

/** Create a `TResultSuccess` with data and timestamp */
export function ResultSuccess<Data = unknown>(
  data: Data
): TResultSuccess<Data> {
  return {
    type: 'success',
    data,
    timestamp: new Date().toISOString(),
    error: null,
  };
}

/** Create a default Ok `TResultSuccess` */
export function ResultOk(): TResultSuccess<HasMessage> {
  return ResultSuccess({ message: 'Ok' });
}

/** Create a default not found `TResultError` */
export function ResultNotFound(): TResultError {
  return ResultError('Not found');
}

/** Create a default 500 `TResultError` */
export function Result500(): TResultError {
  return ResultError('Something went wrong');
}

/** Extract error message from AxiosError instance */
export function getAxiosError(error: AxiosError<TResultError>): string {
  if (error.response) return error.response.data.error.message;

  if (error.request) return 'Network problem';

  return 'Something went wrong';
}

/** Attempt to extract the error message from passed object, fallback to default message  */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;

  if (axios.isAxiosError(error)) return getAxiosError(error);

  if (hasMessage(error)) return error.message;

  return 'Something went wrong';
}
