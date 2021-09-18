// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult, TResultSuccess } from '@common';
import { MarsRoversResponse } from '@mars-rover-api';
import { buildMarsRoversUrl } from '@modules/mars-rovers';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import type { NextApiHandler } from 'next';

export type GetData = MarsRoversResponse;
export type Rovers_Index_GetData = TResultSuccess<GetData>;

const get: NextApiHandler<TResult<GetData>> = async (req, res) => {
  const url = buildMarsRoversUrl();

  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json(ResultError(r.statusText));

  const data = (await r.json()) as MarsRoversResponse;
  return res.status(200).json(ResultSuccess(data));
};

export default withApiHandler({ get });
