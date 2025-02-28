import React, { useState, useRef } from 'react';

const Home = () => {
  const [learningGoal, setLearningGoal] = useState('');
  const [setSelectedLevel] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleCardClick = (username) => {
    // In a real application, you would use router navigation here
    alert(`Navigating to ${username}'s full testimonial page`);
  };

  const handleCourseCardClick = (courseId) => {
    // In a real application, you would use router navigation here
    alert(`Navigating to course ${courseId}`);
  };

  // Course data for the horizontal scroll
  const featuredCourses = [
    {
      id: 'c001',
      title: 'Introduction to Machine Learning',
      instructor: 'Dr. Lisa Johnson',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.8,
      students: 12453,
      color: '#4F46E5'
    },
    {
      id: 'c002',
      title: 'Advanced Web Development',
      instructor: 'Mark Williams',
      level: 'Advanced',
      duration: '8 weeks',
      rating: 4.7,
      students: 8952,
      color: '#7C3AED'
    },
    {
      id: 'c003',
      title: 'Data Analysis with Python',
      instructor: 'Sarah Chen',
      level: 'Intermediate',
      duration: '5 weeks',
      rating: 4.9,
      students: 15789,
      color: '#2563EB'
    },
    {
      id: 'c004',
      title: 'UX/UI Design Fundamentals',
      instructor: 'Alex Rivera',
      level: 'Beginner',
      duration: '4 weeks',
      rating: 4.6,
      students: 7845,
      color: '#EC4899'
    },
    {
      id: 'c005',
      title: 'Blockchain Development',
      instructor: 'Michael Park',
      level: 'Advanced',
      duration: '10 weeks',
      rating: 4.7,
      students: 5623,
      color: '#10B981'
    },
    {
      id: 'c006',
      title: 'Digital Marketing Mastery',
      instructor: 'Jennifer Lopez',
      level: 'Intermediate',
      duration: '6 weeks',
      rating: 4.5,
      students: 9874,
      color: '#F59E0B'
    }
  ];

  // Testimonial data for the marquee
  const testimonials = [
    {
      name: 'John',
      username: '@john',
      text: "I'm at a loss for words. This is amazing. I love it.",
      gradientFrom: '#B6F492',
      gradientTo: '#95CDB1'
    },
    {
      name: 'Jack',
      username: '@jack',
      text: "I've never seen anything like this before. It's amazing. I love it.",
      gradientFrom: '#B6F492',
      gradientTo: '#32CD32'
    },
    {
      name: 'Jill',
      username: '@jill',
      text: "I don't know what to say. I'm speechless. This is amazing.",
      gradientFrom: '#4169E1',
      gradientTo: '#DA70D6'
    },
    {
      name: 'Jenny',
      username: '@jenny',
      text: "I'm at a loss for words. This is amazing. I love it.",
      gradientFrom: '#F0E68C',
      gradientTo: '#D3D3D3'
    },
    {
      name: 'James',
      username: '@james',
      text: "I'm at a loss for words. This is amazing. I love it.",
      gradientFrom: '#20B2AA',
      gradientTo: '#4169E1'
    },
    {
      name: 'Jane',
      username: '@jane',
      text: "I'm at a loss for words. This is amazing. I love it.",
      gradientFrom: '#FF69B4',
      gradientTo: '#FFA500'
    }
  ];

  // Duplicate testimonials for continuous scrolling
  const allTestimonials = [...testimonials, ...testimonials];

  const CourseCard = ({ course }) => (
    <div 
      className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md overflow-hidden mx-3 cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={() => handleCourseCardClick(course.id)}
    >
      <div className="h-4" style={{ backgroundColor: course.color }}></div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">by {course.instructor}</p>
        
        <div className="flex justify-between mb-4 text-sm">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{course.level}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{course.duration}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{course.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">{course.students.toLocaleString()} students</span>
        </div>
      </div>
    </div>
  );

  const TestimonialCard = ({ testimonial }) => (
    <div 
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 w-64 mx-3 flex-shrink-0 transition-transform hover:shadow-lg cursor-pointer transform hover:scale-105"
      onClick={() => handleCardClick(testimonial.username)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex-shrink-0" 
          style={{
            background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`
          }}
        />
        <div>
          <div className="font-medium text-gray-800">{testimonial.name}</div>
          <div className="text-gray-500 text-sm">{testimonial.username}</div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
    </div>
  );

  // Boat SVG component
  const Boat = ({ className }) => (
    <svg 
      className={className} 
      width="50" 
      height="40" 
      viewBox="0 0 50 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 25L40 25L30 35H20L10 25Z" fill="#8B4513" />
      <path d="M25 5V25" stroke="#8B4513" strokeWidth="2" />
      <path d="M25 5L40 25" stroke="#8B4513" strokeWidth="2" />
      <path d="M25 5L10 25" stroke="#8B4513" strokeWidth="2" />
      <path d="M25 5L25 25" stroke="#8B4513" strokeWidth="2" />
      <path d="M20 5H30L25 15L20 5Z" fill="#FFF" />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <nav className="bg-white text-white p-4 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black text-3xl font-bold ms-1">Ed-Venture</div>
          <div className="flex gap-6 items-center">
            <button className="flex items-center gap-1">
              <span className="text-sm">Rewards</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </button>
            <button className="flex items-center gap-1">
              <span className="text-sm">Notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="flex items-center gap-1">
              <span className="text-sm">Profile</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content section with sea and boat animation */}
      <main className="flex-grow flex flex-col items-center px-4 py-16 w-full bg-white text-black relative overflow-hidden">
        {/* Sea animation background */}
        <div className="sea-container absolute inset-0 w-full h-full overflow-hidden">
          {/* Create multiple dotted lines to represent the sea */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={index} 
              className="dotted-wave absolute w-full h-2" 
              style={{
                top: `${index * 40 + 200}px`,
                animationDelay: `${index * 0.001}s`
              }}
            />
          ))}
          
          {/* Animated boat */}
          {/* <Boat className="boat-animation absolute" /> */}
        </div>

        <h4 className="text-6xl font-bold mb-8 relative z-10">Hello learner!</h4>
        
        <div className="w-full max-w-lg relative z-10">
          <p className="text-xl mb-2">what you want to learn today?</p>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 mb-6 h-48 bg-white bg-opacity-90"
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-3">
            <button
              className={`px-6 py-2 rounded-full bg-black text-white`}
              onClick={() => handleLevelSelect('beginner')}
            >
              beginner
            </button>
            
            <button
              className={`px-6 py-2 rounded-full bg-black text-white`}
              onClick={() => handleLevelSelect('intermediate')}
            >
              intermediate
            </button>
            
            <button
              className={`px-6 py-2 rounded-full bg-black text-white`}
              onClick={() => handleLevelSelect('advanced')}
            >
              advanced
            </button>
            
            <button className="w-12 h-12 rounded-full bg-black">
              {/* This is the empty black circle button */}
            </button>
          </div>
        </div>
      </main>
      
      {/* Course scroll section */}
      <div className="w-full bg-white py-8 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <button className="text-blue-600 hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex">
              {featuredCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial marquee section */}
      <div className="w-full bg-gray-100 py-8">
        <h2 className="text-center text-3xl font-bold mb-6">What Our Learners Say</h2>
        <div 
          className="marquee-container overflow-hidden" 
          ref={marqueeRef}
        >
          <div className={`marquee-content flex ${isPaused ? 'paused' : ''}`}>
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer section */}
      <footer className="bg-black text-white p-8 w-full">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h2 className="text-5xl font-bold mb-2">Ed-Venture</h2>
              <p className="text-lg">
                lets start your adventures sail<br />
                for for bright future
              </p>
            </div>
            
            <div>
              <p className="text-xl">company</p>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for scrolling and animations */}
      <style jsx global>{`
        /* Hide scrollbar for clean UI */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
        
        /* Marquee animation */
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
          padding: 1rem 0;
        }
        
        .marquee-content.paused {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Sea and boat animations */
        .sea-container {
          z-index: 0;
          pointer-events: none;
        }
        
        .dotted-wave {
          border-top: 2px dashed rgba(0, 100, 255, 0.2);
          animation: wave 15s linear infinite;
        }
        
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .boat-animation {
          top: 180px;
          left: -60px;
          animation: sailBoat 30s linear infinite;
          z-index: 5;
        }
        
        @keyframes sailBoat {
          0% {
            transform: translateX(-50px) rotate(0deg);
            left: -60px;
          }
          10% {
            transform: translateX(100px) rotate(2deg);
          }
          20% {
            transform: translateX(200px) rotate(-2deg);
          }
          30% {
            transform: translateX(300px) rotate(1deg);
          }
          40% {
            transform: translateX(400px) rotate(-1deg);
          }
          50% {
            transform: translateX(500px) rotate(2deg);
          }
          60% {
            transform: translateX(600px) rotate(-2deg);
          }
          70% {
            transform: translateX(700px) rotate(0deg);
          }
          100% {
            transform: translateX(120%) rotate(0deg);
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LearningPlatform;