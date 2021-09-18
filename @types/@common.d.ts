declare module '@common' {
  import { AxiosError } from 'axios';

  type HasMessage = { message: string };
  type TResultError = {
    type: 'error';
    error: HasMessage | Error;
    timestamp: string;
    data: null;
  };

  type TResultSuccess<Data = unknown> = {
    type: 'success';
    data: Data;
    timestamp: string;
    error: null;
  };

  type TResult<Data = unknown> = TResultSuccess<Data> | TResultError;

  type ApiError = AxiosError<TResultError>;
}
