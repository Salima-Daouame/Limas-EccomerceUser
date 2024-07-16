import React from 'react';
import { useChain, useSpring, useSpringRef, useTransition, animated } from '@react-spring/web';
import sunglasses from '../Images/sunglasses.jpg';
import rings from '../Images/rings.jpeg';
import watches from '../Images/watches.jpg';
import necklace from '../Images/necklace.jpg';

const categories = [
  { image: sunglasses, description: 'Sunglasses' },
  { image: rings, description: 'Rings' },
  { image: watches, description: 'Watches' },
  { image: necklace, description: 'Necklaces' }
];

const Categories = () => {
  const springRef = useSpringRef();
  const springs = useSpring({
    ref: springRef,
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 2000 },
  });

  const transRef = useSpringRef();
  const transitions = useTransition(categories, {
    ref: transRef,
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(50px)' },
    config: { duration: 2000 },
  });

  useChain([springRef, transRef], [0, 0.5]);
  return (
    <animated.div style={springs} className="container mx-auto py-8 mb-12 px-4" id="categories" name="Categories">
    <div className="container mx-auto py-8 mb-12 px-4" id='categories' name='Categories'>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Our Categories</h1>
        <p className="text-lg text-gray-600 dark:text-white">Explore the variety of categories we offer.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" >
      {transitions((style, item, t, index) => (
          <animated.div key={index} style={style} className="flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 rounded-full overflow-hidden">
              <img src={item.image} alt='' className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-sm md:text-base font-bold text-lg text-gray-700 dark:text-white hover:text-orange-500 transition duration-300 dark:hover:text-orange-500">
              {item.description}
            </p>
          </animated.div>
        ))}
      </div>
    </div>
    </animated.div>
  );
};

export default Categories;


