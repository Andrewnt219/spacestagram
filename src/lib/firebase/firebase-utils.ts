import { firestore } from 'firebase-admin';

export const increment = firestore.FieldValue.increment(1) as unknown as number;
export const decrement = firestore.FieldValue.increment(
  -1
) as unknown as number;
