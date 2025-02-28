import React, { useState, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { 
  LucideClock, 
  LucideShieldCheck, 
  LucideDollarSign, 
  LucideCheckCircle, 
  LucideCalendarCheck, 
  LucideThumbsUp,
  LucideUsers,
  LucideCalendar,
  LucideHardHat,
  LucideArrowUp
} from "lucide-react";

const features = [
  {
    title: "Per Hour Charges",
    description: "No hidden costs! You pay only for the hours worked, ensuring cost-effectiveness and transparency.",
    icon: <LucideClock size={40} />,
  },
  {
    title: "Reliable Service Providers",
    description: "We verify all professionals through a rigorous screening process, ensuring reliability and high-quality service.",
    icon: <LucideShieldCheck size={40} />,
  },
  {
    title: "Consistent Pricing",
    description: "Say goodbye to fluctuating service rates! We ensure fixed pricing for all common handyman tasks.",
    icon: <LucideDollarSign size={40} />,
  },
  {
    title: "Customer Trust",
    description: "Read real reviews from past customers and choose service providers with confidence.",
    icon: <LucideCheckCircle size={40} />,
  },
  {
    title: "Easy Booking",
    description: "Book services instantly through our seamless scheduling system. No more back-and-forth communication hassles!",
    icon: <LucideCalendarCheck size={40} />,
  },
  {
    title: "Satisfaction Guaranteed",
    description: "If you're not happy, we'll make it right! We ensure customer satisfaction with a hassle-free refund policy.",
    icon: <LucideThumbsUp size={40} />,
  },
];

// Mock data for statistics
const statisticsData = [
  {
    icon: <LucideUsers size={48} />,
    value: 15000,
    label: "Happy Users",
    prefix: "",
    suffix: "+",
  },
  {
    icon: <LucideCalendar size={48} />,
    value: 28500,
    label: "Bookings Completed",
    prefix: "",
    suffix: "",
  },
  {
    icon: <LucideHardHat size={48} />,
    value: 1200,
    label: "Verified Vendors",
    prefix: "",
    suffix: "+",
  },
];

// Improved counter animation component with scroll trigger
const SmoothCounter = ({ value, duration = 2500, prefix = "", suffix = "", inView }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const requestRef = useRef();
  const startTimeRef = useRef();
  
  // Reset and restart animation whenever inView changes
  useEffect(() => {
    // Reset variables
    startTimeRef.current = null;
    countRef.current = 0;
    setCount(0);
    
    // Cancel any existing animation
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    // Only animate when in view
    if (inView) {
      const endValue = parseInt(value);
      
      const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
        
        // Use easeOutExpo for smoother animation that slows down at the end
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        
        countRef.current = Math.floor(easeOutExpo * endValue);
        setCount(countRef.current);
        
        if (progress < 1) {
          requestRef.current = requestAnimationFrame(animate);
        }
      };
      
      requestRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [inView, value, duration]);

  return (
    <span className="text-4xl md:text-5xl font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Back to top button component
const BackToTopButton = ({ visible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button 
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary text-white shadow-lg transform transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
      }`}
    >
      <LucideArrowUp size={24} />
    </button>
  );
};

const LandingPage = () => {
  const [statsSectionInView, setStatsSectionInView] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const statsRef = useRef(null);
  const [spline, setSpline] = useState(null);

  // Handle Spline load to control animation
  const onSplineLoad = (splineApp) => {
    setSpline(splineApp);
    
    // Make sure the animation loops continuously
    if (splineApp) {
      // Some Spline scenes may have a default animation that can be controlled
      try {
        // Set animation to loop
        const animations = splineApp.findObjectsByType("Animation");
        if (animations && animations.length > 0) {
          animations.forEach(animation => {
            animation.play();
            animation.loop = true;
          });
        }
      } catch (error) {
        console.log("Note: This Spline scene may not have standard animations to control");
      }
    }
  };

  useEffect(() => {
    // Create the Intersection Observer for stats section
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Set state based on whether the section is in view
        setStatsSectionInView(entry.isIntersecting);
      },
      { 
        threshold: 0.25 // Requires at least 25% of the section to be visible
      }
    );

    // Start observing once the ref is available
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    // Add scroll listener for back to top button
    const handleScroll = () => {
      // Show back to top button when scrolled down at least 300px
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-base-200 text-white font-sans overflow-hidden">
      {/* Global Spline Animation that covers the entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Spline 
          scene="https://prod.spline.design/zsFxuJ4HhOoPlGMU/scene.splinecode"
          onLoad={onSplineLoad}
        />
      </div>
      
      {/* Semi-transparent gradient overlay to ensure content readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/20 to-black/50 z-0 pointer-events-none"></div>

      {/* Back to Top Button */}
      <BackToTopButton visible={showBackToTop} />

      {/* Navbar with HandyGo Logo */}
      <div className="absolute top-6 left-8 z-20">
        <div className="text-3xl font-bold text-primary">HandyGo</div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 z-10">
        <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">What Are Your Needs?</h1>
        <div className="mt-6 flex gap-6">
          <button className="btn-glass animate-fade-in-up">Need a Hand</button>
          <button className="btn-glass animate-fade-in-up delay-500">Lend a Hand</button>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        id="stats-section"
        className="relative py-20 px-6 z-10 overflow-hidden min-h-screen flex flex-col justify-center"
      >
        {/* Additional section-specific backdrop for better readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-10"></div>
        
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in">
            Trusted by Thousands
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {statisticsData.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center backdrop-blur-lg bg-base-100/20 rounded-xl p-8 border-2 border-transparent hover:border-primary transition-all duration-500 shadow-lg transform hover:-translate-y-2"
              >
                <div className="text-primary mb-4">{stat.icon}</div>
                <div className="h-16 flex items-center justify-center">
                  <SmoothCounter 
                    value={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                    inView={statsSectionInView}
                  />
                </div>
                <p className="text-xl mt-2 opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Why Choose Us" Section */}
      <section
        id="why-choose-us"
        className="relative py-20 px-6 z-10 overflow-hidden min-h-screen flex flex-col justify-center"
      >
        {/* Additional section-specific backdrop for better readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 animate-fade-in">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100/70 backdrop-blur-md shadow-xl p-6 flex flex-col items-center text-center animate-slide-up">
              <div className="text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-sm opacity-80 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;