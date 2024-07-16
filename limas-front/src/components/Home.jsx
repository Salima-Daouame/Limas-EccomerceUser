import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import backgroundImage from '../Images/woman.png'; 
import backgroundImage1 from '../Images/man1.png'; 
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(-50px)',
    config: { duration: 2000 },
  });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <animated.div ref={ref} style={springProps} className={`relative md:flex table w-full items-center md:h-screen  ${isMobile ? 'py-1' : 'py-36'} bg-emerald-500/5`} id="home">
      <img src={backgroundImage1} alt="" className='intro route bg-image mt-8' />
      <div className={`${isMobile ? 'mt-8' : ''} container relative`}>
        <div className="grid grid-cols-1 justify-center">
          <div className="text-center dark:text-white">
            <span className="uppercase font-semibold text-lg">New Collection of Accessories</span>
            <h2 className="md:text-6xl text-4xl md:leading-normal leading-normal font-bold my-2 ">
              Man and Woman
            </h2>
            <p className="text-lg">Our latest collection of essential basics.</p>
            <div className="mt-6">
              <Link to="/allproducts" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-slate-900 dark:bg-orange-500 text-white rounded-md">
                Shop Now <i className="mdi mdi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <img src={backgroundImage} alt="" className='intro route bg-image' />
    </animated.div>
  );
}

export default Home;




