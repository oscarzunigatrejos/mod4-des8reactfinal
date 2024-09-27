import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyNavbar from "./components/Navbar";
import Home from './pages/Home';
import Footer from './components/Footer';
import './style.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { Card } from 'react-bootstrap';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import CartProvider from './context/CartContext';
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from 'react';

function App() {
  const { auth, profile } = useContext(UserContext);

  // /* verifica si el usuario esta logueado para cambiar el estado de auth y manejar las rutas*/
  // useEffect(() => {
  //   profile();
  // }, []);

  return (
    <>
      <CartProvider>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={!auth ? <Register /> : <Profile />} />
          <Route path="/login" element={!auth ? <Login /> : <Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={auth ? <Profile /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
      <Footer />

    </>
  )
}

export default App
