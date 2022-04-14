import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyU0kXE80daCAWqhVPkWNUF-UZt3kUHZU",
  authDomain: "crwn-db-3b9aa.firebaseapp.com",
  projectId: "crwn-db-3b9aa",
  torageBucket: "crwn-db-3b9aa.appspot.com",
  essagingSenderId: "718204007282",
  appId: "1:718204007282:web:5666ebda83fb774edfe3eb",
  measurementId: "G-ZG3YR8V35H",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Todo Create Sign-in with email

export const createUserAuthWithEmailPassword = async (
  auth_,
  email,
  password
) => {
  if (!email || !password) return;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth_,
      email,
      password
    );
    return user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("auth/email-already-in-use");
    } else {
      console.log(error);
    }
  }
};

export const db = getFirestore();

export const createUserDocumentFromAuthEmailAndPassword = async (
  userAuth,
  otherData = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      setDoc(userDocRef, { email, createdAt, ...otherData });
    } catch (error) {
      console.log("document field setting failed");
    }
  }
  return userDocRef;
};

//

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
