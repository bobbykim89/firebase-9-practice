import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';

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

// queries
const q = query(colRef, orderBy('createdAt'));

// realtime collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// Get single document
const docRef = doc(db, 'books', 'kyEz2rtkejJLdshibz5n');
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});
