// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult } from '@common';
import {
  MarsRoverPhotosQuery,
  MarsRoverPhotosResponse,
} from '@mars-rover-photos-api';
import {
  buildMarsRoverPhotosUrl,
  isMarsRoverPhotosQuery,
} from '@modules/mars-rover-photos';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import type { NextApiHandler } from 'next';
export type Photos_Index_GetData = MarsRoverPhotosResponse;
export type Photos_Index_GetQuery = MarsRoverPhotosQuery;
const get: NextApiHandler<TResult<Photos_Index_GetData>> = async (req, res) => {
  if (!isMarsRoverPhotosQuery(req.query)) {
    return res.status(400).json(ResultError('Missing `rover_id`'));
  }

  const url = buildMarsRoverPhotosUrl(req.query);

  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json(ResultError(r.statusText));

  const data = (await r.json()) as MarsRoverPhotosResponse;
  return res.status(200).json(ResultSuccess(data));
};

export default withApiHandler({ get });
