import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingBody() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex h-screen items-center justify-center bg-green-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16">
        <div
          className={`space-y-8 text-center transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="space-y-2">
            <h1 className="font-inter text-4xl font-bold text-green-700 sm:text-5xl lg:text-6xl">
              Ace Your Interviews
            </h1>
            <h2 className="font-inter text-4xl font-bold text-green-700 sm:text-5xl lg:text-6xl">
              Preparation Tools
            </h2>
          </div>
          <p className="mx-auto max-w-3xl font-inter text-base leading-relaxed text-gray-700 sm:text-lg lg:text-xl">
            Prepare for job interviews with personalized feedback, realistic scenarios, and
            AI-powered coaching. Available exclusively for NORMI 4th year students.
          </p>
          <div className="pt-4">
            <Link
              to="/login"
              className="inline-block rounded-full border-2 border-green-700 px-8 py-3 font-inter text-lg font-medium text-green-700 transition-all duration-300 hover:bg-green-700 hover:text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
