import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaHeart, FaRegHeart } from "react-icons/fa";

// El componente ahora recibe "product" como prop, que se espera tenga al menos: 
// id, name, image, price y description.
const ProductCard = ({ product }) => {
  // Estado para los productos favoritos, cargados desde localStorage
  const [favorites, setFavorites] = useState([]);
  // Estado para el carrito, también cargado desde localStorage
  const [cart, setCart] = useState([]);

  // Cargar favoritos desde localStorage al montar el componente
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Función para alternar (agregar/quitar) el producto en la lista de favoritos
  const toggleFavorite = (product) => {
    let updatedFavorites;
    // Verificar si el producto ya está en favoritos
    if (favorites.some((fav) => fav.id === product.id)) {
      // Si está, quitarlo
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      // Si no está, agregarlo
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    // Guardar la lista actualizada en localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = (product) => {
    let updatedCart;
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      // Si existe, incrementar la cantidad
      updatedCart = cart.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      // Si no existe, agregarlo con cantidad 1
      updatedCart = [...cart, { product: product, quantity: 1 }];
    }
    setCart(updatedCart);
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Card style={{ width: '18rem' }} className="ProductCards">
      {/* Imagen del producto */}
      <Card.Img variant="top" src={product.image} alt={`Foto producto ${product.name}`} />
      <Card.Body>
        {/* Nombre del producto */}
        <Card.Title>{product.name}</Card.Title>
        {/* Descripción del producto */}
        <Card.Text>
          {product.description}
        </Card.Text>
        {/* Precio del producto */}
        <Card.Text>
          <strong>Precio:</strong> ${product.price}
        </Card.Text>
        {/* Botón para agregar al carrito */}
        <Button variant="primary" onClick={() => handleAddToCart(product)}>
          Agregar al Carrito
        </Button>
        {/* Botón para alternar favorito */}
        <Button variant="light" onClick={() => toggleFavorite(product)} style={{ marginLeft: "10px" }}>
          {favorites.some((fav) => fav.id === product.id) ? (
            <FaHeart color="red" />
          ) : (
            <FaRegHeart color="gray" />
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
