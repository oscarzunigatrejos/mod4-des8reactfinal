import React from 'react';
import bgImagen from '../assets/images/header3.png';
import PizzaLogo from '../assets/pizza-logo.svg';
import { motion } from "framer-motion"
import { Button } from 'react-bootstrap';
export const Header = () => {
    return (
        <>
            <div className="p-5 text-center bg-image parallax" style={{ backgroundImage: `url(${bgImagen})` }}>
                <div>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <motion.img animate={{
                                scale: [1, 2, 2, 1, 1],
                                rotate: [0, 0, 270, 270, 0],
                                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                            }} src={PizzaLogo} alt="Pizza Logo" height="64px" width="64px" /><h1 className="mb-3" >Pizzería Mamma Mía</h1>
                            <h4 className="mb-3">¡El verdadero sabor de Italia!</h4>
                            <Button variant="success">Mira nuesta carta!</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
