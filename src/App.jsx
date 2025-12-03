import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {
  const [shows, setShows] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsCollection = collection(db, "shows");
        const albumsCollection = collection(db, "albums");

        const [showsSnapshot, albumsSnapshot] = await Promise.all([
          getDocs(showsCollection),
          getDocs(albumsCollection),
        ]);

        const showsData = showsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const albumsData = albumsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setShows(showsData);
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <div className="app-root">
        <Routes>
          <Route
            path="/"
            element={<LandingPage shows={shows} albums={albums} />}
          />
          <Route path="/admin" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard
                  shows={shows}
                  setShows={setShows}
                  albums={albums}
                  setAlbums={setAlbums}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
