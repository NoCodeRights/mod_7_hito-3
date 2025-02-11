import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Estado para almacenar los ítems del carrito
  const [cartItems, setCartItems] = useState([]);
  // Estado para gestionar la carga y posibles errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función para obtener los ítems del carrito desde el backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError("");
      // Obtener el token almacenado en localStorage
      const token = localStorage.getItem("token");
      // Realizar la solicitud GET al endpoint del carrito
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          "Content-Type": "application/json",
          // Enviar el token en el header para autenticar la solicitud
          Authorization: `Bearer ${token}`,
        },
      });
      // Si la respuesta no es exitosa, lanzar un error
      if (!response.ok) {
        throw new Error("Error al obtener los datos del carrito");
      }
      // Convertir la respuesta a JSON
      const data = await response.json();
      // Suponemos que la respuesta tiene una propiedad "items" que es un arreglo
      setCartItems(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un ítem del carrito
  const handleRemoveItem = async (itemId) => {
    try {
      // Obtener el token almacenado
      const token = localStorage.getItem("token");
      // Realizar la solicitud DELETE al endpoint para eliminar el ítem
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el ítem del carrito");
      }
      // Actualizar el estado quitando el ítem eliminado
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // useEffect para cargar los ítems del carrito al montar el componente
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container my-4">
      <h2>Carrito de Compras</h2>
      {loading ? (
        // Mostrar mensaje de carga mientras se obtiene la información
        <p>Cargando carrito...</p>
      ) : error ? (
        // Mostrar mensaje de error si ocurrió algún problema
        <div className="alert alert-danger">{error}</div>
      ) : cartItems.length === 0 ? (
        // Si no hay ítems, mostrar mensaje y enlace para ver productos
        <div>
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      ) : (
        // Si hay ítems, mostrarlos en una tabla
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>
                    {/* Botón para eliminar el ítem */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Enlace para continuar comprando */}
          <Link to="/productos" className="btn btn-primary">
            Continuar Comprando
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
