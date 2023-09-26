import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../cotexts/authContext"
import { PROFILE } from "../../infrastructure/paths"

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuthContext()

  if (isAuthenticated) return <Navigate to={PROFILE} />

  return <Outlet />
}

export default PublicRoute
