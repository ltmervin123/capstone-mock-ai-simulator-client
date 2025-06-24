import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Link to="/">
      <header className="fixed w-full bg-green-700 font-inter">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-3 py-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center">
            <div className=".block flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-inter text-3xl font-bold text-white md:text-5xl lg:text-5xl">
                NORMI
              </span>
              <span className="font-inter text-sm font-semibold text-white md:text-3xl lg:text-3xl">
                Interview Simulator
              </span>
            </div>
          </div>
        </div>
      </header>
    </Link>
  );
}
