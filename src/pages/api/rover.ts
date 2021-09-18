// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult } from '@common';
import { MarsRoverQuery, MarsRoverResponse } from '@mars-rover-api';
import { buildMarsRoverUrl, isMarsRoverQuery } from '@modules/mars-rovers';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import type { NextApiHandler } from 'next';
export type Rover_Index_GetData = MarsRoverResponse;
export type Rover_Index_GetQuery = MarsRoverQuery;

const get: NextApiHandler<TResult<Rover_Index_GetData>> = async (req, res) => {
  if (!isMarsRoverQuery(req.query)) {
    return res.status(400).json(ResultError('Missing `rover_id`'));
  }

  const url = buildMarsRoverUrl(req.query);

  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json(ResultError(r.statusText));

  const data = (await r.json()) as MarsRoverResponse;
  return res.status(200).json(ResultSuccess(data));
};

export default withApiHandler({ get });
