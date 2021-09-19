import { firestore } from 'firebase-admin';

/** Increase a field by 1 in firestore. Cast the reponse to number for type check */
export const increment = firestore.FieldValue.increment(1) as unknown as number;

/** Decrease a field by 1 in firestore. Cast the reponse to number for type check */
export const decrement = firestore.FieldValue.increment(
  -1
) as unknown as number;
