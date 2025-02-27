import './App.css';
import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import PublishProduct from './pages/PublishProduct';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import { UserContext } from './Context/UserContext';
import { ApiProvider } from './Context/ApiContext';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useContext(UserContext) || {};
  console.log("Token en App:", token);

  return (
    <ApiProvider>
      <Header isAuthenticated={isAuthenticated} />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route
            path="/publish"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PublishProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/politica" element={<PoliticaPrivacidad />} />
        </Routes>
      </main>
      <Footer />
    </ApiProvider>
  );
}

export default App;