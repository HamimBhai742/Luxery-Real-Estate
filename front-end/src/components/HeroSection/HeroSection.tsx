'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Dream Property', 'Luxury Home', 'Perfect Estate', 'Ideal Villa'];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <section className='relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-amber-600/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
      </div>

      <div className='relative max-w-7xl mx-auto text-center'>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'>
          <span className='block text-gray-900 dark:text-white animate-fade-in-down'>
            Discover Your
          </span>
          <span className='block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent min-h-[1.2em]'>
            {text}
            <span className='animate-blink'>|</span>
          </span>
        </h1>
        <p className='max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-400 mb-12 animate-fade-in-up'>
          Experience luxury living with our curated collection of premium
          properties in the most exclusive locations worldwide.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up' style={{ animationDelay: '0.3s' }}>
          <Link href='/properties'>
            <button className='px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300'>
              Explore Properties
            </button>
          </Link>
          <Link href='/contact'>
            <button className='px-8 py-4 bg-white dark:bg-black/80 backdrop-blur-xl border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300'>
              Schedule Tour
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
