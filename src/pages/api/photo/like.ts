import { TResult, TResultSuccess, ValidateQuery } from '@common';
import { PhotoLike } from '@modules/photo-likes';
import { PhotoLikesService } from '@modules/photo-likes/server-index';
import { initPhotoLike } from '@modules/photo-likes/utils';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { withApiHandler } from '@utils/with-api-handler';
import { NextApiHandler } from 'next';

type PostData = PhotoLike;
export type Photo_Like_PostData = TResultSuccess<PostData>;
export type Photo_Like_PostBody = Pick<PhotoLike, 'photo_id' | 'user_id'>;

/** Add a liked photo to the user's favorite list */
const post: NextApiHandler<TResult<PostData>> = async (req, res) => {
  const body = validateBody(req.body);
  if (body.type === 'error') return res.status(400).json(body);

  const photoLike = await PhotoLikesService.get(body.data);
  if (photoLike) {
    return res.status(304).json(ResultSuccess(photoLike));
  }

  const newPhotoLike = initPhotoLike(body.data);
  await PhotoLikesService.create(newPhotoLike);
  return res.status(201).json(ResultSuccess(newPhotoLike));
};

const validateBody: ValidateQuery<Photo_Like_PostBody> = (body) => {
  const castedBody = body as Photo_Like_PostBody;

  if (typeof castedBody.photo_id !== 'string') {
    return ResultError('Missing photo_id');
  }

  if (typeof castedBody.user_id !== 'string') {
    return ResultError('Missing user_id');
  }

  return ResultSuccess(castedBody);
};

export default withApiHandler({ post });
