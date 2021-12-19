import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAaezNLXZGvJ893pNEPbWaf1CUA8yYbtQU',
  authDomain: 'fir-9-practice-fbf83.firebaseapp.com',
  projectId: 'fir-9-practice-fbf83',
  storageBucket: 'fir-9-practice-fbf83.appspot.com',
  messagingSenderId: '269120716181',
  appId: '1:269120716181:web:1f734dda23d4fa18aa0a9c',
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
