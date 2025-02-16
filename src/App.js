import React from 'react';
import GlowingText from 'src/components/GlowingText';
import NeonGrid from 'src/components/NeonGrid';
import Pyramid from 'src/components/Pyramid';
import InfoPanels from 'src/components/InfoPanels';

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
