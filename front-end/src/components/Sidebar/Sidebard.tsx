/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoIosLogOut } from 'react-icons/io';
import {
  FiHome,
  FiPlus,
  FiGrid,
  FiUsers,
  FiMenu,
  FiX,
  FiChevronRight,
  FiCalendar,
  FiCreditCard,
} from 'react-icons/fi';
import { logout } from '@/helpers/logOut';
import Swal from 'sweetalert2';
import { getMe } from '@/helpers/getMe';
import { ImProfile } from 'react-icons/im';
import { FaBlog } from 'react-icons/fa6';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdDiscount } from 'react-icons/md';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  role?: 'USER' | 'ADMIN';
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState({
    success: false,
    data: {
      id: null,
      email: null,
      name: null,
      role: null,
    },
  });
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FiHome className='w-5 h-5' />,
      href: '/dashboard',
    },
    {
      id: 'create-property',
      label: 'Create Property',
      icon: <FiPlus className='w-5 h-5' />,
      href: '/dashboard/create-property',
      role: 'ADMIN',
    },
    {
      id: 'create-blog',
      label: 'Create Bolg',
      icon: <FiPlus className='w-5 h-5' />,
      href: '/dashboard/create-blog',
      role: 'ADMIN',
    },
    {
      id: 'manage-property',
      label: 'Manage Property',
      icon: <FiGrid className='w-5 h-5' />,
      href: '/dashboard/manage-property',
      role: 'ADMIN',
    },
    {
      id: 'manage-users',
      label: 'Manage Users',
      icon: <FiUsers className='w-5 h-5' />,
      href: '/dashboard/manage-users',
      role: 'ADMIN',
    },
    {
      id: 'manage-blog',
      label: 'Manage Blog',
      icon: <FaBlog className='w-5 h-5' />,
      href: '/dashboard/manage-blog',
      role: 'ADMIN',
    },
    {
      id: 'my-bookings',
      label: 'My Bookings',
      icon: <FiCalendar className='w-5 h-5' />,
      href: '/dashboard/my-bookings',
      role: 'USER',
    },
    {
      id: 'manage-promo',
      label: 'Manage Promo',
      icon: <MdDiscount className='w-5 h-5' />,
      href: '/dashboard/manage-promo',
      role: 'ADMIN',
    },
    {
      id: 'payment-history',
      label: 'Payment History',
      icon: <FiCreditCard className='w-5 h-5' />,
      href: '/dashboard/payment-history',
      role: 'USER',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <ImProfile className='w-5 h-5' />,
      href: '/dashboard/profile',
      role: 'USER',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <ImProfile className='w-5 h-5' />,
      href: '/dashboard/profile',
      role: 'ADMIN',
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => item.role === user?.data?.role || !item.role
  );
  const isActive = (href: string) => pathname === href;

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
          if (data.success) {
            Swal.fire({
              title: 'Logout!',
              text: data.message,
              icon: 'success',
              background: document.documentElement.classList.contains('dark')
                ? '#1f2937'
                : '#ffffff',
              color: document.documentElement.classList.contains('dark')
                ? '#ffffff'
                : '#000000',
            });
            router.replace('/');
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

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-2xl hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300'
        aria-label='Toggle Sidebar'
      >
        {isOpen ? (
          <FiX className='w-6 h-6 text-white dark:text-gray-200' />
        ) : (
          <FiMenu className='w-6 h-6 text-white dark:text-gray-200' />
        )}
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
           top-0 left-0 h-screen z-40
          w-72 lg:w-80
          bg-white/10 dark:bg-gray-900/90
          backdrop-blur-2xl
          border-r border-white/20 dark:border-gray-700
          shadow-2xl
          transition-transform duration-500 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Glassmorphic Overlay */}
        <div className='absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none' />

        {/* Content Container */}
        <div className='relative h-full flex flex-col p-6'>
          {/* Logo Section */}
          <div className='mb-12 mt-4 flex items-center justify-between'>
            <Link href='/' className='group block'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <span className='text-white font-bold text-xl'>L</span>
                </div>
                <div>
                  <h1 className='text-white dark:text-gray-100 font-bold text-xl tracking-tight'>
                    Luxury Estate
                  </h1>
                  <p className='text-white/60 dark:text-gray-400 text-xs'>
                    {user?.data?.role === 'ADMIN' ? 'Admin' : 'User'} Dashboard
                  </p>
                </div>
              </div>
            </Link>
            <div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <FiSun className='text-yellow-300 text-xl' />
                ) : (
                  <FiMoon className='text-white text-xl' />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className='flex-1 space-y-2'>
            {filteredMenuItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group relative flex items-center space-x-4 px-5 py-4 rounded-2xl
                  transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'bg-white/20 dark:bg-gray-700/50 shadow-lg shadow-blue-500/20'
                      : 'hover:bg-white/10 dark:hover:bg-gray-700/30'
                  }
                `}
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Active Indicator */}
                {isActive(item.href) && (
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-blue-500 to-purple-600 rounded-r-full' />
                )}

                {/* Icon */}
                <div
                  className={`
                  shrink-0 transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'text-white dark:text-gray-100 scale-110'
                      : 'text-white/70 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-100 group-hover:scale-110'
                  }
                `}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`
                  flex-1 font-medium transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'text-white dark:text-gray-100'
                      : 'text-white/70 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-100'
                  }
                `}
                >
                  {item.label}
                </span>

                {/* Arrow Icon */}
                <FiChevronRight
                  className={`
                  w-4 h-4 transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'text-white dark:text-gray-100 opacity-100 translate-x-0'
                      : 'text-white/50 dark:text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }
                `}
                />

                {/* Hover Glow Effect */}
                <div className='absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none' />
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <button
            onClick={handleSignOutBtn}
            className='mt-auto pt-6 border-t border-white/10 dark:border-gray-700 hover:cursor-pointer'
          >
            <div className='px-5 flex items-center gap-3 py-4 rounded-2xl bg-white/10 dark:bg-gray-700/30 backdrop-blur-xl border border-white/10 dark:border-gray-600'>
              <div className='p-2 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
                <IoIosLogOut className='text-2xl text-white' />
              </div>
              <div>
                <h3 className='font-semibold text-left text-white dark:text-gray-100'>
                  {user?.data?.name}
                </h3>
                <p className='text-sm text-white/60 dark:text-gray-400'>
                  {user?.data?.email}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-20 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute bottom-20 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none' />
      </aside>

      {/* Spacer for Desktop */}
      <div className='hidden lg:block w-80 shrink-0' />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
