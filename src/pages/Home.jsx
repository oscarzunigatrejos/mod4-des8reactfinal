import CardPizza from "../components/CardPizza";
import { Header } from "../components/Header";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
//import { cartaPizza } from "../pizzas";

const Home = () => {
    const [api, setApi] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        consultarAPI();
    }, []);

    const consultarAPI = async () => {
        try {
            const url = "http://localhost:5000/api/pizzas";
            const reponse = await fetch(url);
            const data = await reponse.json();
            setError(false);
            setApi(data);
        } catch (error) {
            setError(true);
        }
    }
    return (
        <>
            <Header />

            <Container className="my-4">
                <Row className="mx-2">
                    {error ? <h4>Error en consultar API</h4> : null}

                    {api.length > 0 ? (
                        api.map((element) => (
                            <Col md={4} key={element.id}>
                                <CardPizza
                                    name={element.name}
                                    price={element.price}
                                    image={element.img}
                                    ingredients={element.ingredients}
                                    id={element.id}
                                />
                            </Col>
                        ))
                    ) : (
                        !error && <h4>No hay pizzas disponibles</h4> // Muestra un mensaje cuando no hay datos pero no es un error
                    )}


                </Row>
            </Container>
        </>
    );
}
export default Home;
