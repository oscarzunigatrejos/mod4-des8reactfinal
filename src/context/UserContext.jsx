import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/helpers';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Verifica si hay un token al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            profile();
        }
    }, []);

    // Metodo para iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data?.error) {
                showAlert('error', data.error);
                return;
            }

            localStorage.setItem("token", data.token);
            setAuth(true);
            showAlert('success', 'Logeado correctamente');

            navigate('/profile');
        } catch (error) {
            showAlert('error', 'Error al iniciar sesión');
        }
    };

    // Metodo para registrar un usuario
    const register = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data?.error) {
                showAlert('error', data.error);
                return;
            }

            localStorage.setItem("token", data.token);
            setAuth(true);
            showAlert('success', 'Registro exitoso');
            navigate('/profile');
        } catch (error) {
            showAlert('error', 'Error al registrarse');
        }
    };

    // Metodo para cerrar sesión
    const logout = () => {
        setAuth(false);
        localStorage.removeItem('token');
        showAlert('info', 'Sesión finalizada').then(() => navigate('/'));
    };

    // Metodo para obtener el perfil del usuario
    const profile = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuth(true);
            try {
                const response = await fetch("http://localhost:5000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };

    return (
        <UserContext.Provider value={{ logout, login, auth, register, profile, user }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
