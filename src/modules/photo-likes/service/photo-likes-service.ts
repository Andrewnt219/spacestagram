import { firestore } from '@lib/firebase';
import { PartiallyPartial } from '@utilities';
import { PhotoLike } from '..';

const collectionRef = firestore.collection('photo_likes');

export class PhotoLikesService {
  static async getByUserId(user_id: string): Promise<PhotoLike[]> {
    const snapshot = await collectionRef.where('user_id', '==', user_id).get();
    return snapshot.docs.map(toPhotoLike);
  }

  static async getByPhotoId(photo_id: string): Promise<PhotoLike[]> {
    const snapshot = await collectionRef
      .where('photo_id', '==', photo_id)
      .get();
    return snapshot.docs.map(toPhotoLike);
  }

  static async get(
    query: Pick<PhotoLike, 'photo_id' | 'user_id'>
  ): Promise<PhotoLike | null> {
    const snapshot = await collectionRef
      .where('photo_id', '==', query.photo_id)
      .where('user_id', '==', query.user_id)
      .get();

    if (snapshot.size !== 1) {
      return null;
    }

    return snapshot.docs[0].data() as PhotoLike;
  }

  static async create(data: PhotoLike) {
    await collectionRef.doc(data._id).create(data);
  }

  static async update({ _id, ...data }: PartiallyPartial<PhotoLike, '_id'>) {
    await collectionRef.doc(_id).update(data);
  }

  static async delete(_id: string) {
    await collectionRef.doc(_id).delete();
  }
}

function toPhotoLike(
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
): PhotoLike {
  return doc.data() as PhotoLike;
}
