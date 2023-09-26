import { useAuthContext } from "../../cotexts/authContext"

const Profile: React.FC = () => {
  const { logout } = useAuthContext()

  const handleLogout = (): void => {
    logout()
  }

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Profile
