import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyU0kXE80daCAWqhVPkWNUF-UZt3kUHZU",
  authDomain: "crwn-db-3b9aa.firebaseapp.com",
  projectId: "crwn-db-3b9aa",
  storageBucket: "crwn-db-3b9aa.appspot.com",
  messagingSenderId: "718204007282",
  appId: "1:718204007282:web:5666ebda83fb774edfe3eb",
  measurementId: "G-ZG3YR8V35H",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); //--> This is not optional. Firebase needs to get initialized
//   const analytics = getAnalytics(firebaseApp);  /-->this is optional

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// --------From google firebase documentation-------------------------
//
// signInWithPopup(auth, provider)
//   .then((result) => {
//     //This gives you a google access token. You can use it to access Google API
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//   })
//   .catch((error) => {
//     // Handle errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const errorEmail = error.email;
//   });
//
// -------------------------------------------------------------------

// FIRESTORE
// STORING A USER TO A DATABASE

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  const { email, displayName } = userAuth;

  if (!userSnapShot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { email, displayName, createdAt });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};
