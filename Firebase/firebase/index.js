
import { initializeApp } from "firebase/app";
import { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        sendPasswordResetEmail,
        signOut } from "firebase/auth"
import { getFirestore, doc } from "firebase/firestore"
import { createContext, useState } from "react";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};


export const firebaseContext = createContext(null)

const Firebase = ({children}) => {
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize authentication
    const auth = getAuth(app)

    // Initialize database
    const db = getFirestore(app)

    const [userConnect, setUserConnect] = useState(false)
    const [uid, setUid] = useState(null)
    
    //Sign up user
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    //Sign in user
    const signin = (email, password) => signInWithEmailAndPassword(auth, email, password)

    //verification connexion
    const isConnected = userFunction => onAuthStateChanged(auth, userFunction)

    //Reset password
    const resetPassword = email => sendPasswordResetEmail(auth, email)

    //Sign out session
    const signout = () => signOut(auth)

    //Connection with database
    const user = uid => doc(db, `/users/${uid}`)

    return <firebaseContext.Provider value={{
        db, signin, signup, signout,isConnected,
        resetPassword, user, userConnect, setUserConnect,
        uid, setUid
    }}>
        { children }
    </firebaseContext.Provider>
}

export default Firebase