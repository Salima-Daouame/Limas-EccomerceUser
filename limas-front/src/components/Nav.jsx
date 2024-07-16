
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUserCircle, FaSun, FaMoon, FaCaretDown, FaBars } from 'react-icons/fa';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import Logodark from '../Images/logoDark.png';
import Logoligh from '../Images/logoLight.png';
import { useMediaQuery } from 'react-responsive';

const Nav = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showMenu, setShowMenu] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const { cart, clearCart } = useCart(); // Access the cart context
  const [image, setImage] = useState(localStorage.getItem('image'));
  const [name, setName] = useState(localStorage.getItem('clientName'));
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
  }, [darkMode]);

  const handleCartDropdownToggle = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = () => {
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


  const totalPrice = cart.reduce((sum, item) => sum + item.price * 1, 0);
  return (
    <nav className="fixed bg-white dark:bg-gray-800 shadow-md fixed top-0 w-full z-10 bg-opacity-80 bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="sm:hidden flex items-center justify-between h-16">
          <Link to="/home">
            <img src={darkMode ? Logoligh : Logodark} alt="Logo" className="h-8 w-auto" />
          </Link>
          <div className="flex space-x-4">
            <button className="text-gray-900 dark:text-white">
              <FaSearch className="h-6 w-6" />
            </button>

            <div className="relative">
              <button className="text-gray-900 dark:text-white" onClick={handleCartDropdownToggle}>
                <FaShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">{cart.length}</span>
                )}
              </button>
              {cartDropdownOpen && (
                <div ref={cartDropdownRef} className="dropdown-menu absolute end-0 m-0 mt-4 z-10 w-64 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800">
                  {cart.length === 0 ? (
                    <p className="text-gray-900 dark:text-white px-4 py-2">Your cart is empty</p>
                  ) : (
                    <div>
                      <ul className="max-h-64 overflow-y-auto">
                        {cart.map((item) => (
                          <li key={item.id} className="flex items-center justify-between px-4 py-2 text-gray-900 dark:text-white">
                            <img
                              src={`http://localhost:8081/storage/${item.image}`}
                              alt={item.productname}
                              className="h-16 w-16 object-cover rounded-full "
                            />
                            <span className='ml-4'>{item.productname} </span>
                            <span className='ml-4' >{item.price}DH</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">{totalPrice} DH</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <button className="text-gray-900 dark:text-white" onClick={handleDropdownToggle}>
                {image ? (
                  <img src={image} alt="Admin" className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle className="w-8 h-8" />
                )}
              </button>
              {dropdownOpen && (
                <div ref={dropdownRef} className="z-10 absolute bg-yellow-50 opacity-90 rounded-lg shadow-md w-32 top-full right-0 mt-2">
                  {name && <p className="text-gray-900 text-sm font-semibold dark:text-gray-900 block px-4 py-2">Welcome {name}</p>}

                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/userprofile" className="block px-4 py-2 flex items-center hover:bg-gray-200">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 flex items-center hover:bg-gray-200">
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button onClick={() => setShowMenu(!showMenu)}>
              <FaBars className="h-6 w-6 text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="relative flex items-center justify-between h-16">
            <Link to="/home">
              <img src={darkMode ? Logoligh : Logodark} alt="Logo" className="h-8 w-auto" />
            </Link>
            <div className="flex-1 flex items-center justify-center sm:justify-center lg:justify-center">
              <div className="flex space-x-4">
                <ScrollLink to="home" smooth={true} duration={500} className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
                  <Link to="/">Home</Link>
                </ScrollLink>
                <div className="relative group">
                  <button className="flex items-center text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold">
                    <ScrollLink to="categories" smooth={true} duration={500} className="cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
                      <Link to="/">Categories</Link>
                    </ScrollLink>
                    <FaCaretDown className="ml-1" />
                  </button>
                  <div className="absolute hidden group-hover:block bg-white dark:bg-gray-900 shadow-lg rounded-md mt-1">
                    <Link to="/sunglasses" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Sunglasses</Link>
                    <Link to="/necklaces" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Necklaces</Link>
                    <Link to="/rings" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Rings</Link>
                    <Link to="/watches" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Watches</Link>
                  </div>
                </div>
                <ScrollLink to="newproduct" smooth={true} duration={500} className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
                  <Link to="/">NewProduct</Link>
                </ScrollLink>
                <ScrollLink to="about" smooth={true} duration={500} className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
                  <Link to="/">About</Link>
                </ScrollLink>
                <Link to="/contactus" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold hover:text-orange-500 dark:hover:text-orange-500">Contact</Link>

                <Link to="/signin" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold hover:text-orange-500 dark:hover:text-orange-500">Login</Link>
              </div>
            </div>

            {/* WEB  */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-900 dark:text-white">
                <FaSearch className="h-6 w-6" />
              </button>

              <div className="relative">
                <button className="text-gray-900 dark:text-white" onClick={handleCartDropdownToggle}>
                  <FaShoppingCart className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">{cart.length}</span>
                  )}
                </button>

                {cartDropdownOpen && (
                  <div ref={cartDropdownRef} className="dropdown-menu absolute end-0 m-0 mt-4 z-10 w-64 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800">
                    {cart.length === 0 ? (
                      <p className="text-gray-900 dark:text-white px-4 py-2">Your cart is empty</p>
                    ) : (
                      <div>
                        <ul className="max-h-64 overflow-y-auto">
                          {cart.map((item) => (
                            <li key={item.id} className="flex items-center justify-between px-4 py-2 text-gray-900 dark:text-white">
                              <img
                                src={`http://localhost:8081/storage/${item.image}`}
                                alt={item.productname}
                                className="h-16 w-16 object-cover rounded-full "
                              />
                              <span className='ml-4'>{item.productname} </span>
                              <span className='ml-4' >{item.price}DH</span>
                            </li>

                          ))}
                          <li class="border-t border-gray-100 dark:border-gray-800 my-2 ms-0"></li>
                        </ul>
                        <div className="flex items-center justify-between px-4 py-2">
                          <span className="font-bold">Total(DH):</span>
                          <span className="font-bold">{totalPrice} DH</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!isMobile && (

                <div className="relative">
                  <button className="text-gray-900 dark:text-white" onClick={handleDropdownToggle}>
                    {image ? (
                      <img src={image} alt="Admin" className="w-8 h-8 rounded-full" />
                    ) : (
                      <FaUserCircle className="w-8 h-8" />
                    )}
                  </button>
                  {dropdownOpen && (
                    <div ref={dropdownRef} className="z-10 absolute bg-yellow-50 opacity-90 rounded-lg shadow-md w-36 top-full right-0 mt-2">
                      {name && <p className="text-gray-900 text-sm font-semibold dark:text-gray-900 block px-4 py-2">Welcome {name}</p>}
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <Link to="/userprofile" className="block px-4 py-2 flex items-center hover:bg-gray-200">
                            <UserIcon className="w-4 h-4 mr-2" />
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button onClick={logout} className="block text-left px-4 py-2 flex items-center hover:bg-gray-200">
                            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                            Log Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <button onClick={() => setDarkMode(!darkMode)} className="text-gray-900 dark:text-white relative inline-block w-10 h-6 rounded-full bg-gray-300 dark:bg-gray-500 transition-all duration-300">
                <div className={`absolute inset-0 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-600 transform transition-transform ${darkMode ? 'translate-x-full' : 'translate-x-0'}`}>
                  {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-yellow-500" />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>


      {showMenu && (

        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center justify-center">
            <ScrollLink to="home" smooth={true} duration={500} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
              <Link to="/">Home</Link>
            </ScrollLink>
            <div className="relative group">
              <button className="flex items-center text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold">
                <ScrollLink to="categories" smooth={true} duration={500} className="cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
                  <Link to="/">Categories</Link>
                </ScrollLink>
                <FaCaretDown className="ml-1" />
              </button>
              <div className="absolute hidden group-hover:block bg-white dark:bg-gray-900 shadow-lg rounded-md mt-1">
                <Link to="/sunglasses" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Sunglasses</Link>
                <Link to="/necklaces" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Necklaces</Link>
                <Link to="/rings" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Rings</Link>
                <Link to="/watches" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-black">Watches</Link>
              </div>
            </div>
            <ScrollLink to="newproduct" smooth={true} duration={500} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
              <Link to="/">New Products</Link>
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
              <Link to="/">About Us</Link>
            </ScrollLink>
            <Link to="/contactus" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-semibold hover:text-orange-500 dark:hover:text-orange-500">Contact</Link>
            <ScrollLink to="signin" smooth={true} duration={500} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:text-orange-500 dark:hover:text-orange-500">
              <Link to="/signin">Login</Link>
            </ScrollLink>
          </div>

        </div>

      )}

    </nav>
  );
};

export default Nav;



