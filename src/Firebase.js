// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC-cADAuYIhv1k5JkdM_nhg6ZcO1CNs8o4',
	authDomain: 'recipe-9d244.firebaseapp.com',
	projectId: 'recipe-9d244',
	storageBucket: 'recipe-9d244.appspot.com',
	messagingSenderId: '732826993404',
	appId: '1:732826993404:web:25d8ee9a53c8127a3f8d79',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
