import React from 'react';
import GlowingText from './components/GlowingText';
import NeonGrid from './components/NeonGrid';
import Pyramid from './components/Pyramid';
import InfoPanels from './components/InfoPanels';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <GlowingText />
      <NeonGrid />
      <Pyramid />
      <InfoPanels />
    </div>
  );
}

export default App;
