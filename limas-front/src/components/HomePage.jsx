import React from 'react';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import Categories from './Categories.jsx';
import Newproduct from './Newproduct.jsx';
import About from './About.jsx';

function HomePage() {
  return (
    <div>
      <Nav />
      <Home />
      <Categories />
      <Newproduct />
      <About />
    </div>
  );
}

export default HomePage;
