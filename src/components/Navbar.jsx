import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { Badge, Button, Col, Row, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNumber } from '../scripts.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PizzaLogo from '../assets/pizza-logo.svg';
import Titulo from './Titulo.jsx';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { motion, useAnimate } from "framer-motion"
import Profile from '../pages/Profile.jsx';


const MyNavbar = () => {
    const { count } = useContext(CartContext);
    const { auth, logout } = useContext(UserContext);
    const [scope, animate] = useAnimate()

    const total = count;


    useEffect(() => {
        animate(scope.current, { scale: [1, 1.2, 1] }, { duration: 0.5 });
    }, [total]);

    return (
        <Navbar expand="lg" className="bg-dark sticky-top" data-bs-theme="dark">
            <Container>

                <Navbar.Brand as={Link} to="/">

                    <p className='titulo'>  <img src={PizzaLogo} alt="Pizza Logo" height="32px" width="32px" /><Titulo /> </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavLink
                            as={Link} to="/"
                            className={({ isActive }) => (isActive ? "is-active" : "no-active")} >
                            🍕 Home
                        </NavLink>

                        <NavLink
                            as={Link}
                            to={auth ? '/profile' : '/register'}
                            className={({ isActive }) => (isActive ? "is-active" : "no-active")}>
                            {auth ? '🔓 Profile' : '🔒 Register'}
                        </NavLink>

                        <NavLink
                            onClick={auth ? logout : undefined}
                            as={Link}
                            to={auth ? '/login' : '/login'}
                            className={({ isActive }) => (isActive ? "is-active" : "no-active")}>
                            {auth ? '😥 Logout' : '🔐 Login'}
                        </NavLink>

                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/cart">
                            <motion.div ref={scope} >
                                <Button variant="success" style={{ margin: '0 5px' }}>
                                    🛒 Total: {formatNumber(total)}
                                </Button>
                            </motion.div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};
export default MyNavbar;
