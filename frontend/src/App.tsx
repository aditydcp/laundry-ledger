import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./lib/routes-protected"
import PublicRoute from "./lib/routes-public"
import SignUp from "./pages/auth/SignUp"
import Wardrobe from "./pages/home/Wardrobe"
import HomeLayout from "./components/layouts/HomeLayout"
import Washlist from "./pages/home/Washlist"
import "@/App.css"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/wardrobe" replace />}
      />
      <Route
        path="/wardrobe"
        element={<ProtectedRoute>
          <HomeLayout>
            <Wardrobe />
          </HomeLayout>
        </ProtectedRoute>
        }
      />
      <Route
        path="/washlist"
        element={<ProtectedRoute>
          <HomeLayout>
            <Washlist />
          </HomeLayout>
        </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={<PublicRoute>
          <Login />
        </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={<PublicRoute>
          <SignUp />
        </PublicRoute>
        }
      />
    </Routes>
  )
}

export default App
