import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Figure, Button } from 'react-bootstrap'
import profileImg from '../assets/images/profile.png'
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext';


const Profile = () => {
    const { logout, auth, profile, user } = useContext(UserContext);


    useEffect(() => {
        profile();
    }, []);


    return (
        <Container >
            <Figure className="my-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Figure.Image
                    width={150}
                    height={150}
                    alt="Perfil de usuario"
                    src={profileImg}

                />
            </Figure>
            {user ? (
                <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} className="formulario">

                    <h4 className='text-center'>Bienvenido: {user.email}</h4>

                    <Button variant="warning" className="w-100 my-2" onClick={logout}>Cerrar sesión</Button>

                </motion.div>
            ) : (
                <h4 className='text-center'>Cargando perfil...</h4>
            )}
        </Container>
    )
}
export default Profile;