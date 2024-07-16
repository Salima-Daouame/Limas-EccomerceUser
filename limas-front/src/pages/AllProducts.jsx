// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import swal from 'sweetalert';
// import Nav from '../components/Nav';
// import About from '../components/About';
// import { motion } from "framer-motion";

// function AllProducts() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get('http://localhost:8000/api/allproducts');
//         setCategories(response.data.categories);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddToCart = async (product) => {
//     const clientId = localStorage.getItem('client_id');

//     if (!clientId) {
//       swal('Please log in to add products to your cart.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8000/api/cart', {
//         client_id: clientId,
//         product_id: product.id
//       });
//       addToCart(product);
//       swal('Product added to cart successfully.');
//     } catch (error) {
//       console.error('There was an error!', error);
//       swal('There was an error adding the product to your cart.');
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <>
//       <Nav />
//       <div className="mx-auto p-4 bg-emerald-500/5" id="newproduct">
//         <h3 className="text-3xl font-bold mb-4 text-center dark:text-white">All products</h3>
//         <div className="grid grid-cols-5 gap-4">
//           {categories.map((category) => (
//             category.products.map((product) => (
//               <motion.div
//                 key={product.id}
//                 className="max-w-xs mx-auto mb-4"
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.1,
//                   ease: [0, 0.71, 0.2, 1.01]
//                 }}
//                 whileHover={{
//                   scale: 1.1,
//                   transition: { duration: 0.3 }
//                 }}
//               >
//                 <div className="rounded-xl overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
//                   <img className="w-full h-40 object-cover" src={`http://127.0.0.1:8081/storage/${product.image}`} alt={product.productname} />
//                   <div className="p-4">
//                     <div className="font-semibold text-lg mb-1 text-gray-900">{product.productname}</div>
//                     <p className="text-gray-600 text-sm mb-3">{product.description}</p>
//                     <p className="text-gray-800 font-semibold text-base">{product.price} DH</p>
//                     <button onClick={() => handleAddToCart(product)} className="mt-4 bg-orange-500 text-white font-medium py-2 px-4 rounded-full w-full hover:bg-orange-300 focus:outline-none focus:shadow-outline">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ))}
//         </div>
//       </div>
//       <About />
//     </>
//   );
// }

// export default AllProducts;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import swal from 'sweetalert';
import { motion } from "framer-motion";

import Nav from '../components/Nav';
import About from '../components/About';

function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:8000/api/allproducts');
        setCategories(response.data.categories);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Nav />
      <div className="mx-auto p-4 bg-emerald-500/5" id="newproduct">
        <h3 className="text-3xl font-bold mb-4 text-center dark:text-white">All products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) =>
            category.products.map((product) => (
              <motion.div
                key={product.id}
                className="max-w-xs mx-auto mb-4"
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
                <div className="rounded-xl overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <img
                    className="w-full h-40 object-cover"
                    src={`http://127.0.0.1:8081/storage/${product.image}`}
                    alt={product.productname}
                  />
                  <div className="p-4">
                    <div className="font-semibold text-lg mb-1 text-gray-900">
                      {product.productname}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>
                    <p className="text-gray-800 font-semibold text-base">
                      {product.price} DH
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 bg-orange-500 text-white font-medium py-2 px-4 rounded-full w-full hover:bg-orange-300 focus:outline-none focus:shadow-outline"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <About />
    </>
  );
}

export default AllProducts;