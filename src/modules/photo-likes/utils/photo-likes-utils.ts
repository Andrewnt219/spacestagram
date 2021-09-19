import { nanoid } from 'nanoid';
import { PhotoLike } from '..';

/** Create a default `PhotoLike` object */
export function initPhotoLike(
  data: Pick<PhotoLike, 'photo_id' | 'user_id'>
): PhotoLike {
  return {
    ...data,
    _id: nanoid(16),
    _timestamp: new Date().toISOString(),
  };
}
