import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {initializeApp} from 'firebase/app';

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBEi914aLoLFTsDvITSkeZMQq4DuPVynEg',
  authDomain: 'todolist-7eb04.firebaseapp.com',
  projectId: 'todolist-7eb04',
  storageBucket: 'todolist-7eb04.appspot.com',
  messagingSenderId: '945327894797',
  appId: '1:945327894797:web:70465e4ddfc0b497424044',
  measurementId: 'G-XBG3V8M69N',
});

export const getUser = () => new Promise((resolve, reject) => onAuthStateChanged(getAuth(), resolve, reject));
