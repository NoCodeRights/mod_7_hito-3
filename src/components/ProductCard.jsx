import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../Context/ApiContext';
import PropTypes from 'prop-types';
import Remera1 from '../assets/imgs/Remera1.jpg'

const ProductCard = () => {
  const { addToCart } = useContext(ApiContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (product) => {
    let updatedFavorites;

    if (favorites.some((fav) => fav.id === product.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const product = { id: 1, name: "Remera", image: Remera1 };

  return (
    <Card style={{ width: '18rem' }} className="ProductCards">
      <Card.Img variant="top" src={product.image} alt={`Foto producto ${product.name}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Precio: ${product.price}
        </Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)}>
          Agregar al carrito
        </Button>
        <Button variant="light" onClick={() => toggleFavorite(product)} style={{ marginLeft: '10px' }}>
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

// Validación de props con PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, // El ID debe ser un número y es obligatorio
    name: PropTypes.string.isRequired, // El nombre debe ser un string y es obligatorio
    price: PropTypes.number.isRequired, // El precio debe ser un número y es obligatorio
    image: PropTypes.string.isRequired, // La imagen debe ser un string (URL) y es obligatoria
  }).isRequired, // El objeto "product" es obligatorio
};

export default ProductCard;
