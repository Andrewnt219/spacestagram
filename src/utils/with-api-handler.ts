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

/** Check if the method is [a valid http method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) */
function isHttpMethod(method: any): method is HttpMethod {
  return httpMethodList.includes(method);
}

type ApiHandler = NextApiHandler<TResult>;
type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;

/**
 * Made to work specifically with Next.js server functions.
 *
 * - Enforce `TResult<Data>` response
 *
 * - Check if the method of an incoming request is supported by this endpoint
 *
 * - Wrap the api handler in a safety nest
 *
 * @example
 * const get: NextApiHandler<TResult<GetData>> = async (req, res) => {
 *    // -snip-
 * }
 *
 * const post: NextApiHandler<TResult<PostData>> = async (req, res) => {
 *    // -snip-
 * }
 *
 * export default withApiHandler({ get, post });
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
