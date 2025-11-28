'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MdDashboard, MdManageAccounts } from 'react-icons/md';
import { TbBrandBooking } from 'react-icons/tb';
import { logout } from '@/helpers/logOut';
import toast from 'react-hot-toast';
import { ModeToggle } from '../toggole-mode';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    success: false,
    data: {
      id: null,
      email: null,
      name: null,
      role: null,
    },
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
          {
            method: 'POST',
            credentials: 'include',
          }
        );
        const me = await res.json();
        setUser(me);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  const handleSignOutBtn = async () => {
    try {
      const data = await logout();
      if (data?.success) {
        toast.success(data?.message);
        router.replace('/');
        setUser({
          success: false,
          data: {
            id: null,
            email: null,
            name: null,
            role: null,
          },
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-linear-to-r from-amber-500 to-amber-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity' />
              <div className='relative bg-linear-to-br from-amber-500 to-amber-600 p-2 rounded-lg'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                </svg>
              </div>
            </div>
            <span className='text-2xl font-bold bg-linear-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent'>
              LUXE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm  transition-colors group ${
                  pathName === link.href
                    ? 'font-semibold text-amber-500 border-b-2 hover:border-none'
                    : 'text-gray-700 font-medium   dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400  '
                }`}
              >
                {link.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-300' />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div>
            <ModeToggle />
            {user?.success ? (
              <Menu as='div' className='relative ml-3'>
                <MenuButton className='relative'>
                  <MdManageAccounts className='w-8 h-8 border-none' />
                </MenuButton>

                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl py-2 shadow-2xl border border-gray-200/20 dark:border-gray-700/20 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in'
                >
                  {user?.data?.role === 'ADMIN' && (
                    <MenuItem>
                      <Link
                        href='/dashboard'
                        className='flex gap-3 items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 data-focus:bg-blue-50 dark:data-focus:bg-blue-900/20 data-focus:text-blue-600 dark:data-focus:text-blue-400 rounded-lg mx-2 transition-colors'
                      >
                        <MdDashboard />
                        Dashboard
                      </Link>
                    </MenuItem>
                  )}

                  {user?.data?.role === 'USER' && (
                    <MenuItem>
                      <Link
                        href='/my-bookings'
                        className='flex gap-3 items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 data-focus:bg-blue-50 dark:data-focus:bg-blue-900/20 data-focus:text-blue-600 dark:data-focus:text-blue-400 rounded-lg mx-2 transition-colors'
                      >
                        <TbBrandBooking />
                        My Bookings
                      </Link>
                    </MenuItem>
                  )}

                  <MenuItem>
                    <button
                      onClick={handleSignOutBtn}
                      className='flex items-center   px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 data-focus:bg-red-50 dark:data-focus:bg-red-900/20 rounded-lg mx-2 transition-colors'
                    >
                      <svg
                        className='w-4 h-4 mr-3'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className='hidden md:flex items-center space-x-4'>
                <Link
                  href='/login'
                  className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group'
                >
                  <div className='absolute inset-0 bg-linear-to-r from-amber-500 to-amber-600 transition-transform group-hover:scale-105' />
                  <span className='relative'>Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='px-4 pt-2 pb-6 space-y-2 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className='block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors'
            >
              {link.name}
            </Link>
          ))}
          <div>
            {user?.success === true ? (
              <Menu as='div' className='relative ml-3'>
                <MenuButton className='relative hover:cursor-pointer flex rounded-full ring-2 ring-transparent hover:ring-blue-500/30 transition-all duration-300'>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                </MenuButton>

                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl py-2 shadow-2xl border border-gray-200/20 dark:border-gray-700/20 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in'
                >
                  <MenuItem>
                    <Link
                      href='/dashboard'
                      className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 data-focus:bg-blue-50 dark:data-focus:bg-blue-900/20 data-focus:text-blue-600 dark:data-focus:text-blue-400 rounded-lg mx-2 transition-colors'
                    >
                      <svg
                        className='w-4 h-4 mr-3'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
                        />
                      </svg>
                      Dashboard
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handleSignOutBtn}
                      className='flex items-center   px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 data-focus:bg-red-50 dark:data-focus:bg-red-900/20 rounded-lg mx-2 transition-colors'
                    >
                      <svg
                        className='w-4 h-4 mr-3'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className='pt-4 space-y-2'>
                <Link href='/login' className='w-full px-4 py-3 text-base font-semibold text-white bg-linear-to-r from-amber-500 to-amber-600 rounded-lg hover:shadow-lg transition-shadow'>
                  Sign In
                </Link>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
