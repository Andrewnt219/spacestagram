// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult, TResultSuccess, ValidateQuery } from '@common';
import { MarsRoverQuery, MarsRoverResponse } from '@mars-rover-api';
import { buildMarsRoverUrl } from '@modules/mars-rovers';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import type { NextApiHandler } from 'next';

type GetData = MarsRoverResponse;
export type Rover_Index_GetData = TResultSuccess<GetData>;
export type Rover_Index_GetQuery = MarsRoverQuery;

const get: NextApiHandler<TResult<GetData>> = async (req, res) => {
  const query = validateQuery(req.query);

  if (query.type === 'error') return res.status(400).json(query);

  const url = buildMarsRoverUrl(query.data);

  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json(ResultError(r.statusText));

  const data = (await r.json()) as MarsRoverResponse;
  return res.status(200).json(ResultSuccess(data));
};

const validateQuery: ValidateQuery<Rover_Index_GetQuery> = (query) => {
  const castedQuery = query as Rover_Index_GetQuery;

  if (typeof castedQuery.rover_id !== 'string') {
    return ResultError('Missing `rover_id`');
  }

  return ResultSuccess(castedQuery);
};

export default withApiHandler({ get });
