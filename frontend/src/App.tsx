import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./lib/routes-protected"
import PublicRoute from "./lib/routes-public"
import SignUp from "./pages/auth/SignUp"
import { useEffect, useState } from "react"
import Wardrobe from "./pages/home/Wardrobe"
import HomeLayout from "./components/layouts/HomeLayout"
import Washlist from "./pages/home/Washlist"
import "@/App.css"

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
        element={<Navigate to="/wardrobe" replace />}
      />
      <Route
        path="/wardrobe"
        element={<ProtectedRoute isAuthenticated={isAuthenticated}>
          <HomeLayout>
            <Wardrobe />
          </HomeLayout>
        </ProtectedRoute>
        }
      />
      <Route
        path="/washlist"
        element={<ProtectedRoute isAuthenticated={isAuthenticated}>
          <HomeLayout>
            <Washlist />
          </HomeLayout>
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
