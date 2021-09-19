import { TResult, TResultSuccess, ValidateQuery } from '@common';
import { PhotoLike } from '@modules/photo-likes';
import { PhotoLikesService } from '@modules/photo-likes/server-index';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import { NextApiHandler } from 'next';

type DeleteData = PhotoLike;
export type Photo_Unlike_DeleteData = TResultSuccess<DeleteData>;
export type Photo_Unlike_DeleteQuery = Pick<PhotoLike, 'photo_id' | 'user_id'>;

/** Remove the liked photo of a user */
const deleteHandler: NextApiHandler<TResult<DeleteData>> = async (req, res) => {
  const query = validateQuery(req.query);
  if (query.type === 'error') return res.status(400).json(query);

  const photoLike = await PhotoLikesService.get(query.data);
  if (!photoLike) {
    return res.status(404).json(ResultError('Item does not exist'));
  }

  await PhotoLikesService.delete(photoLike._id);
  return res.status(201).json(ResultSuccess(photoLike));
};

const validateQuery: ValidateQuery<Photo_Unlike_DeleteQuery> = (query) => {
  const castedQuery = query as Photo_Unlike_DeleteQuery;

  if (typeof castedQuery.photo_id !== 'string') {
    return ResultError('Missing photo_id');
  }

  if (typeof castedQuery.user_id !== 'string') {
    return ResultError('Missing user_id');
  }

  return ResultSuccess(castedQuery);
};

export default withApiHandler({ delete: deleteHandler });
