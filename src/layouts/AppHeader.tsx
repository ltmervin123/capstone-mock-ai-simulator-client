import { Link } from 'react-router-dom';
import authStore from '@/stores/auth-store';

export default function AppHeader() {
  const user = authStore((state) => state.user);
  const name = `${user?.firstName} ${user?.lastName}`;
  const initials = `${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`;

  return (
    <div className="relative z-50">
      <header className="z-50 w-full bg-green-700 font-inter">
        <div className="mx-auto flex h-24 items-center justify-between p-4 py-2">
          <Link to="/user/dashboard" className="hover:cursor-pointer">
            <div className="flex items-center">
              <span className="font-inter text-3xl font-bold text-white md:text-5xl lg:text-5xl">
                PrepWise
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-white sm:block sm:text-base">
              {name}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <span className="text-base font-bold sm:text-lg">{initials}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
