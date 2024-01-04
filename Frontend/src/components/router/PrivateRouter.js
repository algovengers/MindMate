import { useContext } from "react"
import LoginContext from "../../context/context"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children}) =>{
   
    const {loggedIn} = useContext(LoginContext)
    if(loggedIn){
       return <Navigate to='/' />
    }
    return children
}
