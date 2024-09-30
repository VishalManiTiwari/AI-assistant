import React from 'react';
import Header from './components/Header';
import VoiceAssistant from './components/VoiceAssistant';
import './App.css';

const App = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <Header />
      <VoiceAssistant />
    </div>
  );
};

export default App;
