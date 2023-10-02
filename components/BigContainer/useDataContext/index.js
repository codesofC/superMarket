import { dataApiContext } from "..";
import { useContext } from "react";

export const useDataContext = () => {

    const context = useContext(dataApiContext)

    if(!context){
        throw new Error("useDataContext must be used within DataApiContext")
    }

    return context
}