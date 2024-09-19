import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/utils/protected-routes"
import SignUp from "./pages/auth/SignUp"

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("token"))

  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute isAuthenticated={isAuthenticated}>
          <Home />
        </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
