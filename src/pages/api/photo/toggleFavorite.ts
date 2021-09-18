import { TResult, TResultSuccess, ValidateQuery } from '@common';
import { PhotoLike } from '@modules/photo-likes';
import { PhotoLikesService } from '@modules/photo-likes/server-index';
import { initPhotoLike } from '@modules/photo-likes/utils';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import { NextApiHandler } from 'next';

type PatchData = PhotoLike;
export type Photo_IncraseLike_PatchData = TResultSuccess<PatchData>;
export type Photo_IncraseLike_PatchQuery = Pick<
  PhotoLike,
  'photo_id' | 'user_id'
>;

const get: NextApiHandler<TResult<PatchData>> = async (req, res) => {
  const query = validateQuery(req.query);
  if (query.type === 'error') return res.status(400).json(query);

  const photoLike = await PhotoLikesService.get(query.data);
  if (photoLike) {
    await PhotoLikesService.delete(photoLike._id);
    return res.status(200).json(ResultSuccess(photoLike));
  }

  const newPhotoLike = initPhotoLike(query.data);
  await PhotoLikesService.create(newPhotoLike);
  return res.status(201).json(ResultSuccess(newPhotoLike));
};

const validateQuery: ValidateQuery<Photo_IncraseLike_PatchQuery> = (query) => {
  const castedQuery = query as Photo_IncraseLike_PatchQuery;

  if (typeof castedQuery.photo_id !== 'string') {
    return ResultError('Missing photo_id');
  }

  if (typeof castedQuery.user_id !== 'string') {
    return ResultError('Missing user_id');
  }

  return ResultSuccess(castedQuery);
};

export default withApiHandler({ get });
