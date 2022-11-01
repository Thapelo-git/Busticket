// import firebase from 'firebase/app'
// import firebase from "firebase"
import  firebase from 'firebase'
import "firebase/auth"
import "firebase/database"
import 'firebase/firestore'


const app = firebase.initializeApp({
    apiKey: "AIzaSyDM3elUX8AI0AkrpXGPQObCJqRWXRzrSC0",
    authDomain: "react-contact-69e6e.firebaseapp.com",
    databaseURL: "https://react-contact-69e6e-default-rtdb.firebaseio.com",
    projectId: "react-contact-69e6e",
    storageBucket: "react-contact-69e6e.appspot.com",
    messagingSenderId: "974248023568",
    appId: "1:974248023568:web:7bb66f13d5c0dd3e611c95"

  
})

export const auth = app.auth()
export const bf = app.firestore()
export const db = app.database()
export default app