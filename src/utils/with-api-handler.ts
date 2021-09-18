import { TResult } from '@common';
import { Result500, ResultError } from '@utils/api-utils';
import { NextApiHandler } from 'next';

const httpMethodList = [
  'get',
  'post',
  'update',
  'delete',
  'patch',
  'head',
  'connect',
  'options',
  'trace',
] as const;
type HttpMethod = typeof httpMethodList[number];

function isHttpMethod(method: any): method is HttpMethod {
  return httpMethodList.includes(method);
}

/* -------------------------------------------------------------------------- */
type ApiHandler = NextApiHandler<TResult>;
type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;

/**
 * @description check if the method of an incoming request is supported by this endpoint
 */
export function withApiHandler(handlers: HttpMethodHandlers): ApiHandler {
  return async (req, res) => {
    const method = req.method?.toLowerCase();

    if (!isHttpMethod(method))
      return res.status(400).json(ResultError('Method is missing'));

    const handler = handlers[method];
    if (!handler) {
      return res.status(405).json(ResultError('Method is not allowed'));
    }

    try {
      return await Promise.resolve(handler(req, res));
    } catch (err) {
      console.error(err);
      return res.status(500).json(Result500());
    }
  };
}
