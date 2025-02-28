import React, { useState, useEffect, useRef } from 'react';
import './journeys.css';

const Journeys = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);

  const modules = [
    { id: 0, left: '5%', top: '60%', title: 'Start' },
    { id: 1, left: '25%', top: '50%', title: 'Module 1' },
    { id: 2, left: '45%', top: '40%', title: 'Module 2' },
    { id: 3, left: '65%', top: '30%', title: 'Module 3' },
    { id: 4, left: '85%', top: '20%', title: 'Final' },
  ];

  const calculatePaths = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newPaths = [];
    
    for (let i = 0; i < modules.length - 1; i++) {
      const startX = parseFloat(modules[i].left) * containerRect.width / 100;
      const startY = parseFloat(modules[i].top) * containerRect.height / 100;
      const endX = parseFloat(modules[i + 1].left) * containerRect.width / 100;
      const endY = parseFloat(modules[i + 1].top) * containerRect.height / 100;
      
      newPaths.push(`M ${startX + 40} ${startY + 40} L ${endX + 40} ${endY + 40}`);
    }
    
    setPaths(newPaths);
  };

  useEffect(() => {
    calculatePaths();
    window.addEventListener('resize', calculatePaths);
    return () => window.removeEventListener('resize', calculatePaths);
  }, []);

  const moveBoat = (moduleId) => {
    setCurrentModule(moduleId);
  };

  return (
    <div className="journey-container w-[100vw] h-screen" ref={containerRef}>
      <svg className="path-svg">
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,10"
          />
        ))}
      </svg>
      {modules.map((module) => (
        <div
          key={module.id}
          className="module"
          style={{ left: module.left, top: module.top }}
          onClick={() => moveBoat(module.id)}
        >
          {module.title}
        </div>
      ))}
      <div
        className="boat"
        style={{
          left: modules[currentModule].left,
          top: modules[currentModule].top,
        }}
      />
    </div>
  );
};

export default Journeys;
