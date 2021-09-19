// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult, TResultSuccess, ValidateQuery } from '@common';
import {
  MarsRoverPhoto,
  MarsRoverPhotosQuery,
  MarsRoverPhotosResponse,
} from '@mars-rover-photos-api';
import { PhotoLike } from '@modules/photo-likes';
import { PhotoLikesService } from '@modules/photo-likes/service';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import type { NextApiHandler } from 'next';
import queryString from 'query-string';

type GetData = {
  favoritedPhotos: MarsRoverPhoto[];
  nonFavoritedPhotos: MarsRoverPhoto[];
};
export type Photos_Index_GetData = TResultSuccess<GetData>;
export type Photos_Index_GetQuery = MarsRoverPhotosQuery &
  Pick<PhotoLike, 'user_id'>;
const get: NextApiHandler<TResult<GetData>> = async (req, res) => {
  const query = validateQuery(req.query);

  if (query.type === 'error') return res.status(400).json(query);

  const url = buildUrl(query.data);

  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json(ResultError(r.statusText));

  const data = (await r.json()) as MarsRoverPhotosResponse;

  const favoritedPhotoIds = (
    await PhotoLikesService.getByUserId(query.data.user_id)
  ).map((item) => item.photo_id);

  const favoritedPhotos = data.photos.filter((photo) =>
    favoritedPhotoIds.includes(photo.id.toString())
  );
  const nonFavoritedPhotos = data.photos.filter(
    (photo) => !favoritedPhotoIds.includes(photo.id.toString())
  );

  return res
    .status(200)
    .json(ResultSuccess({ favoritedPhotos, nonFavoritedPhotos }));
};

const validateQuery: ValidateQuery<Photos_Index_GetQuery> = (query) => {
  const castedQuery = query as Photos_Index_GetQuery;

  if (typeof castedQuery.rover_name !== 'string') {
    return ResultError('Missing rover_name');
  }

  if (typeof castedQuery.user_id !== 'string') {
    return ResultError('Missing user_id');
  }

  return ResultSuccess(castedQuery);
};

const buildUrl = ({ rover_name, ...query }: MarsRoverPhotosQuery) => {
  return queryString.stringifyUrl({
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos`,
    query: {
      ...query,
      api_key: process.env['NASA_API_KEY'],
    },
  });
};

export default withApiHandler({ get });
