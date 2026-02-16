import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ProfileSelect from "./pages/ProfileSelect";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MyList from "./pages/MyList";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserPreferencesProvider } from "./context/UserPreferencesContext";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ToastContainer from "./components/ToastContainer";
import NowPlayingPopup from "./components/NowPlayingPopup";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/profile-select" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/profile-select"
        element={
          <ProtectedRoute>
            <ProfileSelect />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tv-shows"
        element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-popular"
        element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-list"
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserPreferencesProvider>
        <ProfileProvider>
          <ToastContainer />
          <NowPlayingPopup />
          <Router>
            <AppRoutes />
          </Router>
        </ProfileProvider>
      </UserPreferencesProvider>
    </AuthProvider>
  );
}

export default App;
