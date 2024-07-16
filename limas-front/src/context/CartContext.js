// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import React, { createContext, useState, useContext, useEffect  } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // const addToCart = (product) => {
  //   const existingProduct = cart.find(item => item.id === product.id);
  //   if (existingProduct) {
  //     setCart(cart.map(item =>
  //       item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //     ));
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


