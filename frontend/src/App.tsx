import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/utils/routes-protected"
import PublicRoute from "./components/utils/routes-public"
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
      <Route
        path="/login"
        element={<PublicRoute isAuthenticated={isAuthenticated}>
          <Login />
        </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={<PublicRoute isAuthenticated={isAuthenticated}>
          <SignUp />
        </PublicRoute>
        }
      />
    </Routes>
  )
}

export default App
