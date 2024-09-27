// Login.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import useInput from "../hooks/useInput";
import imgRegister from '../assets/images/login.png';

const Login = () => {
    const email = useInput("");
    const password = useInput("");
    const { login } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email.value, password.value);
    };

    return (
        <Container>
            <Figure className="my-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Figure.Image
                    width={671}
                    height={180}
                    alt="Registro de usuario"
                    src={imgRegister}
                />
            </Figure>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="formulario">
                <h4 className='text-center'>Inicia tu sesión de Pizzería Mamma Mía</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmailLogin" className='mt-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name='emailLogin'
                            {...email}
                            placeholder="Ingresa tu email"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPasswordLogin" className='mt-4'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name='passwordLogin'
                            {...password}
                            placeholder="Ingresa contraseña"
                        />
                    </Form.Group>

                    <Container className="mt-4 d-flex flex-column justify-content-center">
                        <Button className="mt-4 log" variant="primary" type="submit">
                            Acceder
                        </Button>
                        <p className='text-center mt-2'>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                    </Container>
                </Form>
            </motion.div>
        </Container>
    );
};

export default Login;
