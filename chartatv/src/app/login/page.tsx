// pages/login.js
'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    gsap.fromTo(
      inputsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 }
    );
    
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.9 }
    );
    
    gsap.fromTo(
      ".footer-text",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
    );
  }, []);
  
interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
    readonly elements: FormElements;
}

const handleSubmit = async (e: React.FormEvent<LoginForm>) => {
    e.preventDefault();
    setIsLoading(true);

    // Animation for button loading state
    gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.2,
        ease: "power2.out",
    });

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Form submission logic would go here
        console.log('Logging in with:', { email, password });

        // Success animation
        gsap.to(formRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                // Redirect or show success message
            }
        });

    } catch (error) {
        console.error('Login error:', error);
    } finally {
        setIsLoading(false);
        gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
        });
    }
};
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Head>
        <title>Login | Exportrix</title>
        <meta name="description" content="Login to your account" />
      </Head>
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden p-8">
          <h1 
            ref={titleRef} 
            className="text-3xl font-bold text-center text-black mb-8"
          >
            Welcome Back
          </h1>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                ref={el => { inputsRef.current[0] = el; }}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <input
                ref={el => { inputsRef.current[1] = el; }}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button
              ref={buttonRef}
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <p className="footer-text mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
