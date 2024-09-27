import React from 'react';
import Titulo from './Titulo';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-center text-lg-start mt-4 footer">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                <Link to="/">2024 <Titulo /> </Link>
                <p>Todos los derechos reservados </p>
            </div>
            {/* Copyright */}
        </footer>
    );
};

export default Footer;
