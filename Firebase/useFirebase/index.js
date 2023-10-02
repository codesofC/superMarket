import { useContext } from "react";
import { firebaseContext } from "../firebase";

export const useFirebase = () => {

    const context = useContext(firebaseContext)

    if(!context){
        throw new Error("useFirebase must be used within a FirebaseContext")
    }

    return context
}
