// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import swal from 'sweetalert';
// import { useCart } from '../context/CartContext';
// import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// const NewProduct = () => {
//     const { addToCart } = useCart();
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [index, setIndex] = useState(0);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const response = await axios.get('http://localhost:8000/api/products');
//                 setCategories(response.data.categories || []);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const lastIndex = Math.ceil((categories || []).reduce((total, category) => total + (category.products ? category.products.length : 0), 0) / 3) - 1;
//         if (index < 0) {
//             setIndex(lastIndex);
//         }
//         if (index > lastIndex) {
//             setIndex(0);
//         }
//     }, [index, categories]);

//     useEffect(() => {
//         const slider = setInterval(() => {
//             setIndex((prevIndex) => prevIndex + 1);
//         }, 5000);
//         return () => clearInterval(slider);
//     }, []);

//     const handleAddToCart = async (product) => {
//         const clientId = localStorage.getItem('client_id');

//         if (!clientId) {
//             swal('Please log in to add products to your cart.');
//             return;
//         }

//         try {
//             await axios.post('http://localhost:8000/api/cart', {
//                 client_id: clientId,
//                 product_id: product.id
//             });
//             addToCart(product);
//             swal('Product added to cart successfully.');
//         } catch (error) {
//             console.error('There was an error!', error);
//             swal('There was an error adding the product to your cart.');
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error.message}</p>;
//     }

//     const allProducts = (categories || []).flatMap(category => category.products || []);

//     return (
//         <div className="mx-auto p-4 bg-emerald-500/5" id="newproduct">
//             <h3 className="text-3xl font-bold mb-4 text-center dark:text-white">New Product</h3>
//             <p className="mb-16 text-lg text-center dark:text-white">Check out our latest product! We are sure it will meet your expectations.</p>

//             <div className="relative overflow-hidden">
//                 <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
//                     {allProducts.map((product, productIndex) => (
//                         <div key={productIndex} className="flex-shrink-0 w-1/3 px-2">
//                             <div className="max-w-xs mx-auto mb-4">
//                                 <div className="rounded-xl overflow-hidden shadow-md bg-white">
//                                     <img className="w-full h-40 object-cover" src={`http://127.0.0.1:8081/storage/${product.image}`} alt={product.productname} />
//                                     <div className="p-4">
//                                         <div className="font-semibold text-lg mb-1 text-gray-900">{product.productname}</div>
//                                         <p className="text-gray-600 text-sm mb-3">{product.description}</p>
//                                         <p className="text-gray-800 font-semibold text-base">{product.price} DH</p>
//                                         <button 
//                                             className="mt-4 bg-orange-500 text-white font-medium py-2 px-4 rounded-full w-full hover:bg-orange-700 focus:outline-none focus:shadow-outline"
//                                             onClick={() => handleAddToCart(product)}
//                                         >
//                                             Add to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <button className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => setIndex(index - 1)}>
//                     <FiChevronLeft />
//                 </button>
//                 <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setIndex(index + 1)}>
//                     <FiChevronRight />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default NewProduct;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useCart } from '../context/CartContext';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

const NewProduct = () => {
    const { addToCart } = useCart();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setCategories(response.data.categories || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const lastIndex = Math.ceil((categories || []).reduce((total, category) => total + (category.products ? category.products.length : 0), 0) / 3) - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, categories]);

    useEffect(() => {
        const slider = setInterval(() => {
            setIndex((prevIndex) => prevIndex + 1);
        }, 5000);
        return () => clearInterval(slider);
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

    const allProducts = (categories || []).flatMap(category => category.products || []);

   

    return (
        <div className="mx-auto p-4 bg-emerald-500/5" id="newproduct">
            <h3 className="text-3xl font-bold mb-4 text-center dark:text-white">New Product</h3>
            <p className="mb-16 text-lg text-center dark:text-white">Check out our latest product! We are sure it will meet your expectations.</p>

            <div className="relative overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
                    {allProducts.map((product, productIndex) => ( 
                     <div key={productIndex} className={`flex-shrink-0   ${isMobile ? 'w-10/12 ' : 'w-1/3'} px-2`}>
                            <div className="max-w-xs mx-auto mb-4">
                                <div className="rounded-xl overflow-hidden shadow-md bg-white">
                                    <img className="w-full h-40 object-cover" src={`http://127.0.0.1:8081/storage/${product.image}`} alt={product.productname} />
                                    <div className="p-4">
                                        <div className="font-semibold text-lg mb-1 text-gray-900">{product.productname}</div>
                                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                                        <p className="text-gray-800 font-semibold text-base">{product.price} DH</p>
                                        <button 
                                            className="mt-4 bg-orange-500 text-white font-medium py-2 px-4 rounded-full w-full hover:bg-orange-700 focus:outline-none focus:shadow-outline"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => setIndex(index - 1)}>
                    <FiChevronLeft />
                </button>
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setIndex(index + 1)}>
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
};

export default NewProduct;

























































