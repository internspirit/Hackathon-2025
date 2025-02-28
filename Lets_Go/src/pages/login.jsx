import React from 'react'
import beachBackground from './assets/landing_bg.jpg';
const login = () => {
  return (


// You'll need to add this image to your project's assets folder

    <div className="h-screen w-screen overflow-hidden relative bg-sky-400">
      {/* Main container with beach background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${beachBackground})`,
          // Fallback if image doesn't load
          backgroundColor: '#87CEEB'
        }}
      >
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-transparent z-0"></div>
        
        {/* Content area */}
        <div className="relative z-10 h-full w-full flex flex-col md:flex-row">
          {/* Left side with title and tagline */}
          <div className="md:w-1/2 h-full flex flex-col justify-start pt-36 pl-8 md:pl-24">
            <h1 className="text-5xl md:text-7xl font-bold text-emerald-700 mb-6">
              Ed-Venture
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-md">
              lets start your adventures sail for
              <br />
              for bright future
            </p>
          </div>
          
          {/* Right side with login form */}
          <div className="md:w-1/2 h-full flex items-center justify-center">
            <div className="w-full max-w-md p-8 mx-6 rounded-3xl bg-white bg-opacity-20 backdrop-blur-md shadow-xl">
              <h2 className="text-3xl text-center mb-8 text-gray-800 font-medium">Log IN</h2>
              
              <form className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="email"
                    className="w-full p-4 rounded-md bg-gray-100 bg-opacity-90 text-gray-800 outline-none"
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    placeholder="password"
                    className="w-full p-4 rounded-md bg-gray-100 bg-opacity-90 text-gray-800 outline-none"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-lime-500 hover:bg-lime-600 text-white rounded-full text-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  login
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Palm leaf decorative elements using SVG */}
        <div className="absolute top-0 left-0 w-64 h-64 z-20 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C100 55.2 55.2 100 0 100V0H100Z" fill="#4ade80" fillOpacity="0.6"/>
            <path d="M80 20C80 64.2 44.2 100 0 100V20H80Z" fill="#22c55e" fillOpacity="0.7"/>
            <path d="M60 40C60 73.1 33.1 100 0 100V40H60Z" fill="#15803d" fillOpacity="0.8"/>
          </svg>
        </div>
        
        <div className="absolute bottom-0 left-0 w-96 h-96 z-20 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200C55.2 200 100 155.2 100 100H0V200Z" fill="#4ade80" fillOpacity="0.6"/>
            <path d="M0 180C44.2 180 80 144.2 80 100H0V180Z" fill="#22c55e" fillOpacity="0.7"/>
            <path d="M0 160C33.1 160 60 133.1 60 100H0V160Z" fill="#15803d" fillOpacity="0.8"/>
          </svg>
        </div>
        
        <div className="absolute bottom-0 right-0 w-96 h-96 z-0 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M200 200C144.8 200 100 155.2 100 100H200V200Z" fill="#4ade80" fillOpacity="0.4"/>
            <path d="M200 180C155.8 180 120 144.2 120 100H200V180Z" fill="#22c55e" fillOpacity="0.5"/>
            <path d="M200 160C166.9 160 140 133.1 140 100H200V160Z" fill="#15803d" fillOpacity="0.6"/>
          </svg>
        </div>
        
        {/* Ocean waves */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 z-0">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,160 C300,200 600,100 1200,160 L1200,200 L0,200 Z" fill="#0284c7" fillOpacity="0.3"/>
            <path d="M0,180 C500,120 700,200 1200,180 L1200,200 L0,200 Z" fill="#0ea5e9" fillOpacity="0.4"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default login
