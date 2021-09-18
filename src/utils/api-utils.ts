import { HasMessage, TResultError, TResultSuccess } from '@common';
import axios, { AxiosError } from 'axios';
import { GetStaticPropsResult } from 'next';
import { hasMessage } from './validate-utils';

export function ResultError(message: string): TResultError {
  return {
    type: 'error',
    error: { message },
    timestamp: new Date().toISOString(),
    data: null,
  };
}

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

export function ResultOk(): TResultSuccess<HasMessage> {
  return ResultSuccess({ message: 'Ok' });
}

export function ResultNotFound(): TResultError {
  return ResultError('Not found');
}

export function Result500(): TResultError {
  return ResultError('Something went wrong');
}

export function getAxiosError(error: AxiosError<TResultError>): string {
  if (error.response) return error.response.data.error.message;

  if (error.request) return 'Network problem';

  return 'Something went wrong';
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;

  if (hasMessage(error)) return error.message;

  if (axios.isAxiosError(error)) return getAxiosError(error);

  return 'Something went wrong';
}

export function handleStaticPropsError(
  error: unknown
): GetStaticPropsResult<TResultError> {
  return {
    props: ResultError(getErrorMessage(error)),
    revalidate: 60,
  };
}
