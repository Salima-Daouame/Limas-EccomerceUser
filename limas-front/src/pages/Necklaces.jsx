import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import About from '../components/About';
import swal from 'sweetalert';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
function Nacklaces() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    axios.get('http://localhost:8000/api/nacklaces')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleAddToCart = async (product) => {
    const clientId = localStorage.getItem('client_id');

    if (!clientId) {
      swal('Please log in to add products to your cart.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/cart', {
        client_id: clientId,
        product_id: product.id
      });
      addToCart(product);
      swal('Product added to cart successfully.');
    } catch (error) {
      console.error('There was an error!', error);
      swal('There was an error adding the product to your cart.');
    }
  };

  return (
    <>
      <Nav />
      <div className="pt-16 pb-16 bg-gray-100 dark:bg-slate-950">
        <div className={`flex flex-wrap justify-center mt-12 ${isMobile ? ' mr-12 ml-12 mt-4' : ' mr-4 ml-4'} `}>
          {products.map(product => (
            <motion.div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <div className="rounded-xl overflow-hidden shadow-xl bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out dark:bg-gray-100">
                <img className="w-full h-40 object-cover" src={`http://127.0.0.1:8081/storage/${product.image}`} alt={product.productname} />
                <div className="p-4">
                  <div className="font-semibold text-lg mb-4 text-gray-900">{product.productname}</div>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <p className="text-gray-800 font-semibold text-base">{product.price} DH</p>
                  <button onClick={() => handleAddToCart(product)} className="mt-4 bg-orange-500 text-white font-medium py-2 px-4 rounded-full w-full hover:bg-orange-600 focus:outline-none focus:shadow-outline">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <About />
    </>
  );
}

export default Nacklaces;
