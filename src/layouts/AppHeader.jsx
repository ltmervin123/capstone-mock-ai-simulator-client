import React from 'react';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  const user = {
    name: 'Alvincent F. Sangco',
    initials: 'AS',
  };
  return (
    <div>
      <header className="fixed z-50 w-full bg-green-700 font-inter md:relative">
        <div className="mx-auto flex h-24 items-center justify-between p-4 py-2">
          <Link to="/dashboard">
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
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-white sm:block sm:text-base">
              {user.name}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <span className="text-base font-bold sm:text-lg">{user.initials}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
