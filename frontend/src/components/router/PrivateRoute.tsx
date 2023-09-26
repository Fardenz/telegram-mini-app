import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../cotexts/authContext"
import { LOGIN } from "../../infrastructure/paths"

const PrivateRout: React.FC = () => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) return <Navigate to={LOGIN} />

  return <Outlet />
}

export default PrivateRout
