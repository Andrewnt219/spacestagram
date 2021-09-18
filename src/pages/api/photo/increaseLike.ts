import { TResult, TResultSuccess, ValidateQuery } from '@common';
import { PhotoLike } from '@modules/photo-likes';
import { PhotoLikesService } from '@modules/photo-likes/server-index';
import { ResultError, ResultNotFound, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import { NextApiHandler } from 'next';

type PatchData = PhotoLike;
export type Photo_IncraseLike_PatchData = TResultSuccess<PatchData>;
export type Photo_IncraseLike_PatchQuery = Pick<
  PhotoLike,
  'photo_id' | 'user_id'
>;

const patch: NextApiHandler<TResult<PatchData>> = async (req, res) => {
  const query = validateQuery(req.query);
  if (query.type === 'error') return res.status(400).json(query);

  const photoLike = await PhotoLikesService.get(query.data.photo_id);
  if (!photoLike) return res.status(404).json(ResultNotFound());

  await PhotoLikesService.increaseLike(query.data.photo_id);

  const updatedPhotoLike = await PhotoLikesService.get(query.data.photo_id);
  if (!updatedPhotoLike) return res.status(404).json(ResultNotFound());

  return res.status(200).json(ResultSuccess(updatedPhotoLike));
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

export default withApiHandler({ patch });
