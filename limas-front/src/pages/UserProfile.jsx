import React, { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';
import back from '../Images/back3D.jpg';
import Nav from '../components/Nav';
import About from '../components/About';
import { useMediaQuery } from 'react-responsive';

const UserProfile = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart(); // Access the cart context
  const [image, setImage] = useState(localStorage.getItem('image'));
  const [name, setName] = useState(localStorage.getItem('clientName'));
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem('clientName');
    const email = localStorage.getItem('clientEmail');
    const image = localStorage.getItem('image');

    if (name && email) {
      setUser({ name, email, image });
    }
  }, []);

  useEffect(() => {
    const clientId = localStorage.getItem('client_id');
    axios.get(`http://localhost:8000/api/cart/${clientId}`)
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  const handleLoadMore = () => {
    setDisplayedItems(prev => prev + 6);
  };

  const totalPrice = cartItems.reduce((sum, item) => 
    sum + item.product_price * 1, 0);

  const SignOut = () => {
    localStorage.removeItem('client_id');
    localStorage.removeItem('image');
    localStorage.removeItem('clientName');
    localStorage.removeItem('token');
    localStorage.removeItem('cart'); // Clear cart from localStorage
    setImage(null);
    setName(null);
    clearCart([]); // Clear cart in the state
    navigate('/signin');
  };

  return (
    <>
      <Nav />
      <div className="bg-white dark:bg-gray-900 text-white min-h-screen">
        <img src={back} alt="" className="w-full h-48 object-cover" />
        <div className="absolute inset-0"></div>
        <main className="container mx-auto py-8 flex flex-col md:flex-row">
          <aside className={`w-full md:w-1/4 h-1/4 bg-gray-800 p-4 rounded-lg -mt-16 z-10 relative mb-8 md:mb-0  ${isMobile ? '-mt-12' : '-mt-16'}  `}>
            <div className="flex flex-col items-center space-y-2 mb-4">
              {user.image ? (
                <img src={user.image} alt="" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <FaUserCircle className="w-24 h-24" />
              )}
              <div className="text-center">
                <h2 className="text-lg font-bold">{user.name || "No user yet"}</h2>
                <p className="text-gray-400">{user.email || "No user yet"}</p>
              </div>
            </div>
            <nav className="space-y-2 hover:text-orange-500 dark:hover:text-orange-500">
              <button onClick={SignOut} className="flex items-center py-2 px-4 rounded hover:text-orange-500 dark:hover:text-orange-500">
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </nav>
          </aside>
          <section className="w-full md:w-3/4 ml-0 md:ml-8">
            <div className="mb-8">
              <h2 className={`${isMobile ? 'ml-4' : ''}  text-xl text-black font-bold mb-4 dark:text-white`}>My Orders</h2>
              <table className="min-w-full text-white bg-gray-800 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Order No.</th>
                    <th className="py-2 px-4">Product Name</th>
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.slice(0, displayedItems).map((item, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">{item.product_name}</td>
                      <td className="py-2 px-4">
                        <img src={item.product_image} alt="" className="h-16 w-16 object-cover rounded-full" />
                      </td>
                      <td className="py-2 px-4">{formatDate(item.created_at)}</td>
                      <td className="py-2 px-4">{item.product_price} DH</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot >
                  <tr >
                    <td  colSpan="3" className="py-2 px-0 text-right font-bold">Total :</td>
                    <td className="py-2 px-4 font-bold">{totalPrice} DH</td>
                   
                  </tr>
                </tfoot>
              </table>
              {cartItems.length > displayedItems && (
                <div className="text-end mt-4">
                  <button onClick={handleLoadMore} className="text-white px-2 py-2 rounded-lg hover:text-blue-400">
                    Load More
                  </button>
                </div>
              )}
              {cartItems.length === 0 && (
                <div className="text-center mt-4">
                  <p className="text-gray-400">No orders found</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <About />
    </>
  );
};

export default UserProfile;








