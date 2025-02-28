import React from 'react';

const Boat = () => {
  return (
    <div className="relative w-full h-screen bg-blue-100 overflow-hidden">
      {/* Water */}
      <div className="absolute bottom-0 w-full h-1/3 bg-blue-400"></div>
      
      {/* Boat container */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        {/* Boat hull */}
        <div className="relative">
          <div className="w-64 h-32 bg-amber-700 rounded-b-full"></div>
          
          {/* Boat deck */}
          <div className="absolute top-0 left-0 w-64 h-16 bg-amber-600"></div>
          
          {/* Mast */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-64 bg-gray-800"></div>
          
          {/* Sail */}
          <div className="absolute top-8 left-1/2">
            <div className="triangle-sail" style={{
              width: 0,
              height: 0,
              borderLeft: '100px solid white',
              borderBottom: '120px solid transparent',
              transform: 'translateX(-50px)'
            }}></div>
          </div>
          
          {/* Flag */}
          <div className="absolute top-0 left-1/2">
            <div className="triangle-flag" style={{
              width: 0,
              height: 0,
              borderTop: '20px solid red',
              borderRight: '40px solid transparent',
              transform: 'translateX(2px)'
            }}></div>
          </div>
        </div>
      </div>
      
      {/* Dashed line path */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <path
          d="M 150,100 Q 200,150 250,200 T 350,300 T 450,400 T 550,500"
          stroke="#000"
          strokeWidth="2"
          strokeDasharray="10,5"
          fill="none"
        />
        {/* Arrow at the end */}
        <polygon
          points="550,500 540,480 560,490"
          fill="#000"
        />
      </svg>
    </div>
  );
};

export default Boat;