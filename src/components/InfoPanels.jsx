import React from 'react';

const InfoPanels = () => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold">Mobile Security</h2>
        <p>Information about mobile security.</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold">Network Security</h2>
        <p>Information about network security.</p>
      </div>
    </div>
  );
};

export default InfoPanels;
