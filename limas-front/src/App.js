import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactUs from './pages/ContactUs.jsx';
import HomePage from './components/HomePage.jsx';  
import Categories from './components/Categories.jsx';
import Necklaces from './pages/Necklaces.jsx';
import Rings from './pages/Rings.jsx';
import Sunglasses from './pages/Sunglasses.jsx';
import Watches from './pages/Watches.jsx';
import AllProducts from './pages/AllProducts.jsx'
import UserProfile from './pages/UserProfile.jsx'
import SignIn from './authentification/SignIn.jsx'
import SignUp from './authentification/SignUp.jsx'
import { CartProvider } from './context/CartContext.js'; // Import CartProvider
 

function App() {
  return (
    <Router>
       <CartProvider>
      <div className="dark:text-white dark:bg-slate-950 duration-100">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Categories />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/rings" element={<Rings />} />
          <Route path="/sunglasses" element={<Sunglasses />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      </CartProvider>
    </Router>
  );
}

export default App;
