import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateRoutes() {
  //PrivateRoutes code adapted from Dennis Ivy from https://www.youtube.com/watch?v=2k8NleFjG7I
  const {isLoggedIn} = useSelector((state) => state.user)
  console.log(isLoggedIn)
  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/" />
  )
}

export default PrivateRoutes