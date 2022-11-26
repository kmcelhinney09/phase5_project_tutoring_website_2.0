import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

function PrivateRoutes() {
  //PrivateRoutes code adapted from Dennis Ivy from https://www.youtube.com/watch?v=2k8NleFjG7I
  let isAllowed = useAuth().isLoggedIn
  return (
    isAllowed ? <Outlet/> : <Navigate to="/" />
  )
}

export default PrivateRoutes