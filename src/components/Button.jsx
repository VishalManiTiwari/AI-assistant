import React from 'react';
import { FaMicrophone } from "react-icons/fa";

const Button = ({ content, handleClick, isListening }) => {
  return (
    !isListening && (
      <button
        id="btn"
        onClick={handleClick}
        aria-label="Activate voice assistant"
        aria-pressed={isListening}
        className='relative top-4 bg-gradient-to-r
         from-purple-600 to-blue-600 flex items-center
         p-3 rounded-lg text-white gap-2 '
      >
        <FaMicrophone aria-hidden="true" 
        className="text-lg text-white text-[1.5rem] " />
        <span id="content" 
        className="font-medium text-[1.5rem]
        ">{content}</span>
      </button>
    )
  );
};

export default Button;
