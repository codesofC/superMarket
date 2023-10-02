
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
  apiKey: "AIzaSyCmEfEm_feS3XQVrrGR4XfFdCDtze4cU6Y",
  authDomain: "supermarket-ffee9.firebaseapp.com",
  projectId: "supermarket-ffee9",
  storageBucket: "supermarket-ffee9.appspot.com",
  messagingSenderId: "558369749683",
  appId: "1:558369749683:web:aae6a0e7e68e9a84e24ec6"
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