import { Link } from 'react-router-dom';

export default function LandingHeader() {
  return (
    <header className="fixed w-full bg-green-700 font-inter">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-3 py-2 sm:px-4 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center hover:cursor-pointer">
          <div className="flex items-center">
            <div className=".block flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-inter text-3xl font-bold text-white md:text-5xl lg:text-5xl">
                PrepWise
              </span>
            </div>
          </div>
        </Link>
        <Link
          to="/login"
          className="flex h-11 w-max items-center justify-center rounded-full bg-white p-4 font-inter font-semibold text-green-700 transition-all duration-300 hover:scale-105 sm:h-14 sm:w-36 sm:text-lg md:text-lg lg:text-2xl"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
