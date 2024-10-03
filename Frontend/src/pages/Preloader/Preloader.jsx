import React from 'react';
import { Logo } from '../../svgs/logoSVG';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg h-52 w-96"> {/* Make the card relative */}
        <div className="mb-4 animate-bounce">
          <Logo size={80} />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold text-center text-gray-800 whitespace-nowrap">
            MindMate: Analyzing Chat
          </p>
          <span className="mt-0 ml-2 text-3xl dot-animation">...</span>
        </div>
        {/* Loading Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden bg-gray-200">
          <div className="h-full bg-blue-500 loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
