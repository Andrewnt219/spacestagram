import { firestore } from '@lib/firebase';
import { PartiallyPartial } from '@utilities';
import { PhotoLike } from '..';

const collectionRef = firestore.collection('photo_likes');

/** A collections of methods to work with `photo_likes` table */
export class PhotoLikesService {
  /** get list of liked photos with the specified user_id. Empty array if not found */
  static async getByUserId(user_id: string): Promise<PhotoLike[]> {
    const snapshot = await collectionRef.where('user_id', '==', user_id).get();
    return snapshot.docs.map(toPhotoLike);
  }

  /** get list of liked photos with the specified photo_id. Empty array if not found. */
  static async getByPhotoId(photo_id: string): Promise<PhotoLike[]> {
    const snapshot = await collectionRef
      .where('photo_id', '==', photo_id)
      .get();
    return snapshot.docs.map(toPhotoLike);
  }

  /** get liked photos with the specified  photo_id AND user_id. Null if not found. */
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

  /** Add a new liked photo to the collection */
  static async create(data: PhotoLike) {
    await collectionRef.doc(data._id).create(data);
  }

  /** Update a  liked photo from the collection */
  static async update({ _id, ...data }: PartiallyPartial<PhotoLike, '_id'>) {
    await collectionRef.doc(_id).update(data);
  }

  /** Delete a liked photo from the collection */
  static async delete(_id: string) {
    await collectionRef.doc(_id).delete();
  }
}

/** A helper function to define type and map result from Firestore to `PhotoLike` */
function toPhotoLike(
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
): PhotoLike {
  return doc.data() as PhotoLike;
}
