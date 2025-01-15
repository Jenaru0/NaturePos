import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { setLogLevel } from 'firebase/app';

setLogLevel('debug'); // Habilita logs detallados


const firebaseConfig = {
  apiKey: 'AIzaSyB7rsLNKAwKwbX6Mj8E6R5V-G94MbaKSO8',
  authDomain: 'naturepos-c41de.firebaseapp.com',
  projectId: 'naturepos-c41de',
  storageBucket: 'naturepos-c41de.firebasestorage.app', // ¡Este es el bucket real!
  messagingSenderId: '912053812543',
  appId: '1:912053812543:android:764de2ffb932a8ef9b678a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


console.log('Firebase conectado:', db);

export { db, storage };
