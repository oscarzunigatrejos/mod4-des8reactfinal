import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import imgRegister from '../assets/images/register.png';
import Figure from 'react-bootstrap/Figure';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { showAlert } from '../utils/helpers';
import useInput from "../hooks/useInput";
import { UserContext } from '../context/UserContext';

const Register = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [PasswordConfirmationError, setPasswordConfirmationError] = useState('');
    const { register } = useContext(UserContext);

    const email = useInput("");
    const password = useInput("");

    // Es manejada desde el contexto
    // const showOk = () => {
    //     showAlert('success', `Registro exitoso para ${email.value}`);
    // }

    const showSwal = () => {
        showAlert('error', 'Faltan campos por completar');
    }

    const showPassword = () => {
        showAlert('error', 'El password no cumple los requisitos');
    }

    const validarFormulario = (e) => {
        e.preventDefault();
        if (email.value.trim() === '' || password.value.trim() === '' || confirmPassword.trim() === '') {
            showSwal();
            return;
        }
        if (password.value.length < 6 || password.value !== confirmPassword) {
            showPassword();
            return;
        } else {
            // showOk();
            setConfirmPassword('');
            register(email.value, password.value);
            return;
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        password.onChange(e);  // Actualizar el valor de password usando el hook
        if (value.length < 6) {
            setPasswordError('El password debe tener al menos 6 caracteres');
        } else {
            setPasswordError('');
        }

        if (confirmPassword && value !== confirmPassword) {
            setPasswordConfirmationError('El password y la confirmación del password deben ser iguales');
        } else {
            setPasswordConfirmationError('');
        }
    }

    const handlePasswordConfirmation = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (password.value !== value) {
            setPasswordConfirmationError('El password y la confirmación del password deben ser iguales');
        } else {
            setPasswordConfirmationError('');
        }
    }

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
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} className="formulario">
                <h4 className='text-center'>Registrate y sé parte de Pizzería Mamma Mía</h4>
                <Form onSubmit={validarFormulario}>
                    <Form.Group controlId="formEmail" className='mt-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            {...email}
                            placeholder="Ingresa tu email" />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className='mt-4'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            value={password.value}
                            onChange={handlePasswordChange}
                            placeholder="Ingresa contraseña" />
                        {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className='mt-4'>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name='passwordConfirm'
                            value={confirmPassword}
                            onChange={handlePasswordConfirmation}
                            placeholder="Repite tu contraseña" />
                        {PasswordConfirmationError && <Form.Text className="text-danger">{PasswordConfirmationError}</Form.Text>}
                    </Form.Group>
                    <Container className="mt-4 d-flex flex-column justify-content-center">
                        <Button className="mt-4 log" variant="primary" type="submit">
                            Registrarse
                        </Button>
                        <p className='text-center mt-2'>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </Container>
                </Form>
            </motion.div>
        </Container>
    );
};

export default Register;
