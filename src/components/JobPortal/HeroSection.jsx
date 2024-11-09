import React from 'react';
import heroImage from '../../assets/images/hero.jpg';
import { useColorMode } from '@chakra-ui/react';

const HeroSection = () => {
  const { colorMode } = useColorMode();
  return (
    <div
      className={`relative h-[80vh] ${
        colorMode === 'dark' ? 'bg-[#1A202C]' : 'bg-white'
      }  text-gray-800`}
    >
      {/* Background Image Section */}
      <div
        className="absolute top-0 left-0 w-full h-4/5 bg-cover bg-top"
        style={{
          backgroundImage: `url(${heroImage})`,
          borderEndStartRadius: '25%',
          borderEndEndRadius: '25%',
        }}
      ></div>

      {/* Hero Content */}
      <div
        style={{
          borderEndStartRadius: '25%',
          borderEndEndRadius: '25%',
        }}
        className="relative h-4/5  z-6 pt-32 bg-[#00000091] text-center"
      >
        <h1 className="text-5xl font-bold text-gradient">
          Find Your Dream Job
        </h1>
        <p className="py-6 text-white">
          Browse through hundreds of job opportunities from top companies.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
