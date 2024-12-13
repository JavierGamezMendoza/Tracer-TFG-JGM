import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Feed from "./modules/feed/feed";
import VehiclesFeed from "./modules/vehicle/vehiclesFeed"
import Guardian from "./guard/tokenGuardian";
import Login from "./modules/login/login";
import Register from "./modules/register/register";
import Threadposts from "./modules/threadposts/threadposts";
import Logout from "./guard/logout";
import authService from "./services/authService";
import MyNavbar from "./components/navbar/MyNavbar";
import Users from "./modules/users/users";
import Profile from "./modules/profile/profile";

function App() {

  const [authenticated, setAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [currentUser, setCurrentUser] = useState(true);

  const fetchCurrentUser = () => {
    try {
      const user = authService.getCurrentUser();
      console.log(user)
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarUsuario = (nuevoUsuario) => {
    setAuthenticated(nuevoUsuario);
    fetchCurrentUser();
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [])

  return (
    <div>
      {/* Renderizar el navbar solo si el usuario está autenticado */}

      <BrowserRouter>
        {authenticated && <MyNavbar currentUser={currentUser} />}
        <Routes>
          <Route path="/" element={<Guardian><Feed /></Guardian>} />
          <Route path="/feed" element={<Guardian><Feed /></Guardian>} />
          <Route path="/vehicle/:id" element={<Guardian><VehiclesFeed /></Guardian>} />
          <Route path="/thread/:id" element={<Guardian><Threadposts /></Guardian>} />
          <Route path="/users" element={<Guardian><Users /></Guardian>} />
          <Route path="/profile" element={<Guardian><Profile /></Guardian>} />
          <Route path="/login" element={<Login actualizarUsuario={actualizarUsuario} />} />
          <Route path="/register" element={<Register actualizarUsuario={actualizarUsuario} />} />
          <Route path="/logout" element={<Logout actualizarUsuario={actualizarUsuario} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;