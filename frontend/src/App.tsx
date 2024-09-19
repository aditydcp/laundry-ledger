import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/utils/protected-routes"
import SignUp from "./pages/auth/SignUp"
import { useEffect, useState } from "react"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")))

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")))
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

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
