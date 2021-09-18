import { decrement, firestore, increment } from '@lib/firebase';
import { PartiallyPartial } from '@utilities';
import { PhotoLike } from '..';

const collectionRef = firestore.collection('photo_likes');

export class PhotoLikesService {
  static async get(photo_id: string): Promise<PhotoLike | null> {
    const snapshot = await collectionRef.doc(photo_id).get();
    return (snapshot.data() as PhotoLike) ?? null;
  }

  static async update({
    photo_id,
    ...data
  }: PartiallyPartial<PhotoLike, 'photo_id'>) {
    await collectionRef.doc(photo_id).update(data);
  }

  static async increaseLike(photo_id: string) {
    await this.update({
      photo_id,
      count: increment,
    });
  }

  static async decreaseLike(photo_id: string) {
    await this.update({
      photo_id,
      count: decrement,
    });
  }
}
