import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { formatNumber } from '../scripts.js';
import { Link } from 'react-router-dom';

const CardPizza = ({ name, desc, price, image, ingredients, id, verMas = true }) => {
    const { addToCart } = useContext(CartContext);
    const [showAlert, setShowAlert] = useState(false); // Estado local para manejar la alerta

    const HorizontalLine = ({ color }) => (
        <div
            style={{
                borderBottom: `1px solid ${color}`,
                margin: '10px 0',
                padding: 2,
            }}
        />
    );

    const handleAddClick = () => {
        const pizza = { name, price, image, ingredients, id };
        addToCart(pizza);
        setShowAlert(true); // Mostrar la alerta al agregar la pizza

        // Ocultar la alerta después de 3 segundos
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <Card className="card-pizza mt-4">
            <Card.Img variant="top" src={image} alt={name} />

            <Card.Body>
                <ListGroup className="list-group-flush">
                    <Card.Title style={{ textTransform: 'uppercase' }}>{name}</Card.Title>
                    <HorizontalLine color="gray" />
                    <Card.Text>{desc}</Card.Text>
                    <Card.Text>
                        🍽️<strong>Ingredientes: </strong>{ingredients.join(", ")}
                    </Card.Text>
                    <HorizontalLine color="gray" />
                    <h4 className='text-center'>Precio: {formatNumber(price)}</h4>

                    <div className="d-flex justify-content-around py-2">
                        {verMas ? <Link to={`/pizza/${id}`}><Button variant="outline-success">Ver más</Button></Link> : ''}
                        <Button variant="success" onClick={handleAddClick}>Añadir 🛒</Button>
                    </div>
                    {showAlert && (
                        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            Producto agregado al carrito.
                        </Alert>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default CardPizza;
