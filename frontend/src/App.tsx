import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LOGIN, PROFILE, REGISTER } from "./infrastructure/paths"
import Register from "./views/auth/Register"
import Login from "./views/auth/Login"
import Profile from "./views/profile/Profile"
import { AuthContextProvider } from "./cotexts/authContext"
import PublicRoute from "./components/router/PublicRoute"
import PrivateRout from "./components/router/PrivateRoute"

const router = createBrowserRouter([
  {
    path: PROFILE,
    element: <PrivateRout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: REGISTER,
        element: <Register />,
      },
    ],
  },
], {
  basename: '/telegram-bot/'
})

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
