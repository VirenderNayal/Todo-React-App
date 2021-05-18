import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCEWuNPxm27Kr4hg5n2Bu0GgYB9-rpjsrE",
    authDomain: "todo-react-app-843a0.firebaseapp.com",
    projectId: "todo-react-app-843a0",
    storageBucket: "todo-react-app-843a0.appspot.com",
    messagingSenderId: "837251141644",
    appId: "1:837251141644:web:0f099a5d08b4a151745e29",
    measurementId: "G-85706SFCJE"
});

export const db = firebaseApp.firestore();
