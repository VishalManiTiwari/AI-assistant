import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-center py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">
        I&apos;M <span id="name" className="text-orange-500">Tony Stark</span>, Your{' '}
        <span id="va" className="text-purple-500">Virtual Assistant</span>
      </h1>
    </header>
  );
};

export default Header;
