import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        calcularTotal();
    }, [cart]);

    const addToCart = (element) => {
        setCart((prevState) => {
            const exist = prevState.find((x) => x.id === element.id);

            if (exist) {
                return prevState.map((x) => x.id === element.id ? { ...exist, cantidad: exist.cantidad + 1 } : x);
            } else {
                return [...prevState, { ...element, cantidad: 1 }];
            }
        });


    };

    const removeFromCart = (element) => {
        setCart((prevState) => {
            const exist = prevState.find((x) => x.id === element.id);

            if (exist) {
                if (exist.cantidad <= 1) {
                    return prevState.filter((x) => x.id !== element.id);
                } else {
                    return prevState.map((x) => x.id === element.id ? { ...exist, cantidad: exist.cantidad - 1 } : x);
                }
            }
            return prevState;
        });
    };

    const calcularTotal = () => {
        let nuevoValor = cart.reduce((a, c) => a + c.price * c.cantidad, 0);
        setCount(nuevoValor);
    };

    return (
        <CartContext.Provider value={{ count, cart, addToCart, removeFromCart }}>
            {children}

        </CartContext.Provider>
    );
};

export default CartProvider;
