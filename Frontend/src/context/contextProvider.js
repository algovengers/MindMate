import { useState } from "react"
import LoginContext from "./context"

const ContextProvider = ({children})=>{
    const [loggedIn,setLoggedIn] = useState(false);
    function login(){
        setLoggedIn(true);
    }
    function logout(){
        setLoggedIn(false);
    }

    return (
        <LoginContext.Provider value={{login,logout,loggedIn}} >
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider