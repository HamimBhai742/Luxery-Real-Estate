/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Swal from 'sweetalert2';
import { getAuth } from '@/helpers/getAuth';
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
        const me = await getAuth();
        setUser(me);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  const handleSignOutBtn = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to sign out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Sign Out!',
      background: document.documentElement.classList.contains('dark')
        ? '#1f2937'
        : '#ffffff',
      color: document.documentElement.classList.contains('dark')
        ? '#ffffff'
        : '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await logout();
          console.log(data)
          if (data.success) {
            toast.success(data.message);
            router.replace('/');
            window.location.reload();
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.message,
              icon: 'error',
              background: document.documentElement.classList.contains('dark')
                ? '#1f2937'
                : '#ffffff',
              color: document.documentElement.classList.contains('dark')
                ? '#ffffff'
                : '#000000',
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while logout.',
            icon: 'error',
            background: document.documentElement.classList.contains('dark')
              ? '#1f2937'
              : '#ffffff',
            color: document.documentElement.classList.contains('dark')
              ? '#ffffff'
              : '#000000',
          });
        }
      }
    });
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
          ? 'bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-600 dark:from-amber-500 dark:to-amber-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity' />
              <div className='relative bg-linear-to-br from-blue-500 to-indigo-600 dark:from-amber-500 dark:to-amber-600 p-2 rounded-lg'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                </svg>
              </div>
            </div>
            <span className='text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent'>
              LUXE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm transition-colors group ${
                  pathName === link.href
                    ? 'font-semibold text-blue-600 dark:text-amber-500 border-b-2 border-b-blue-600 dark:border-b-amber-600 hover:border-none'
                    : 'text-gray-800 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-amber-400'
                }`}
              >
                {link.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-600 dark:from-amber-500 dark:to-amber-600 group-hover:w-full transition-all duration-300' />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <ModeToggle />
          <div className='max-sm:hidden'>
            {user?.success ? (
              <div className='hidden md:flex items-center space-x-4'>
                <button
                  onClick={handleSignOutBtn}
                  className='px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors'
                >
                  Sign Out
                </button>
                <Link
                  href='/dashboard'
                  className='relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group'
                >
                  <div className='absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 transition-transform group-hover:scale-105' />
                  <span className='relative'>Dashboard</span>
                </Link>
              </div>
            ) : (
              <div className='hidden md:flex items-center space-x-4'>
                <Link
                  href='/login'
                  className='px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group'
                >
                  <div className='absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 transition-transform group-hover:scale-105' />
                  <span className='relative'>Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
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
              className='block px-4 py-3 text-base font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors'
            >
              {link.name}
            </Link>
          ))}
          <div>
            {user?.success ? (
              <div className=' md:hidden items-center space-x-4'>
                <button
                  onClick={handleSignOutBtn}
                  className='px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors'
                >
                  Sign Out
                </button>
                <Link
                  href='/dashboard'
                  className='relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group'
                >
                  <div className='absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 transition-transform group-hover:scale-105' />
                  <span className='relative'>Dashboard</span>
                </Link>
              </div>
            ) : (
              <div className=' md:hidden items-center space-x-4'>
                <Link
                  href='/login'
                  className='px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group'
                >
                  <div className='absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 transition-transform group-hover:scale-105' />
                  <span className='relative'>Get Started</span>
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
