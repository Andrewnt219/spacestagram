// Import the functions you need from the SDKs you need
import * as admin from 'firebase-admin';
import { serviceAccount } from './service-account';

// Initialize Firebase

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
