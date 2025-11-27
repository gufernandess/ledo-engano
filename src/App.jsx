import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import { initialShows, initialAlbums } from "./data/mockData";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [shows, setShows] = useState(initialShows);
  const [albums, setAlbums] = useState(initialAlbums);

  return (
    <Router>
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
              <AdminDashboard
                shows={shows}
                setShows={setShows}
                albums={albums}
                setAlbums={setAlbums}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
