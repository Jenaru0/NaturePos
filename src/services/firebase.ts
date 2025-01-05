import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB7rsLNKAwKwbX6Mj8E6R5V-G94MbaKSO8',
  authDomain: 'naturepos-c41de.firebaseapp.com',
  projectId: 'naturepos-c41de',
  storageBucket: 'naturepos-c41de.appspot.com',
  messagingSenderId: '912053812543',
  appId: '1:912053812543:android:764de2ffb932a8ef9b678a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Firebase conectado:', db);

export {db};
