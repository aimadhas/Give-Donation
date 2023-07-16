import * as React from 'react';
import image1 from "../assets/image1.jpg";
import Typed from 'react-typed';
import SearchIcon from '@mui/icons-material/Search';

const Hero = () => {
  return (
    <div
        style={{
          backgroundImage:`url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      className=" text-white h-[93vh] flex flex-col items-center relative" >
        <span className='absolute w-full h-screen bg-white bg-opacity-30 '></span>
        <h1 className='text-6xl font-semibold text-center mt-[180px]'>
          Extend A Helping Hand:  <Typed
          className=' text-6xl font-bold md:pl-4 pl-2'
            strings={['Give Hope', 'Provide Optimism']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </h1>
        <p className='font-light text-2xl mt-5 lg:w-[700px] mb-[30px] text-center'>
          Be wise through charity. Be yourself in loving others. Believe in tomorrow. Bless others with your gift. Build great futures with great charity.
        </p>
    </div>
  )
}

export default Hero
