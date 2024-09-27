import { useEffect, useState } from 'react';
import CardPizza from '../components/CardPizza';
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useParams } from 'react-router-dom';

const Pizza = () => {
    const [pizza, setPizza] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    const queryPizza = async () => {
        try {
            const url = `http://localhost:5000/api/pizzas/${id}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();
            setPizza(data);
        } catch (err) {
            setError('Ocurrió un error al obtener la pizza.');
        }
    };

    useEffect(() => {
        queryPizza();
    }, []);

    if (error) {
        return <Alert variant='danger'>{error}</Alert>;
    }

    if (!pizza) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6} key={pizza.id}>
                    <CardPizza
                        name={pizza.name}
                        desc={pizza.desc}
                        price={pizza.price}
                        image={pizza.img}
                        ingredients={pizza.ingredients}
                        id={pizza.id}
                        verMas={false}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Pizza;
