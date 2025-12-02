/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useMemo, useEffect } from 'react';
import {
  FiSearch,
  FiFilter,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdAdminPanelSettings, MdVerified } from 'react-icons/md';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'active' | 'inactive';
  createdAt: string;
}

interface IMetaDta {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface ManageUserClientProps {
  users: User[];
}

const ManageUserClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [metaData, setMetaData] = useState<IMetaDta>();
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'active' | 'inactive'
  >('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage,"hgjhghjghjgj");
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${currentPage}&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setUsers(data.data.data);
      setMetaData(data.data.metaData);
    };
    fetchUsers();
  }, [currentPage]);
  console.log(users, metaData);

  // Stats
  const stats = {
    total: metaData?.total || 0,
    active: users.filter((u) => u.status === 'active').length,
    inactive: users.filter((u) => u.status === 'inactive').length,
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: 'active' | 'inactive'
  ) => {
    try {
      console.log(newStatus)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-status/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      console.log(data)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      )
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-black p-4 md:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='p-4 rounded-xl bg-linear-to-br from-blue-500 to-purple-500'>
              <HiOutlineUserGroup className='text-white text-3xl' />
            </div>
            <div>
              <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>
                Manage Users
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-1'>
                Oversee and manage all platform users
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 rounded-xl p-4 border border-blue-200 dark:border-blue-500/20'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Total Users
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
                    {stats.total}
                  </p>
                </div>
                <FiUsers className='text-3xl text-blue-600 dark:text-blue-400' />
              </div>
            </div>
            <div className='bg-linear-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 rounded-xl p-4 border border-green-200 dark:border-green-500/20'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Active
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
                    {stats.active}
                  </p>
                </div>
                <AiOutlineCheckCircle className='text-3xl text-green-600 dark:text-green-400' />
              </div>
            </div>
            <div className='bg-linear-to-br from-red-50 to-red-100 dark:from-red-500/10 dark:to-red-600/10 rounded-xl p-4 border border-red-200 dark:border-red-500/20'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Inactive
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
                    {stats.inactive}
                  </p>
                </div>
                <AiOutlineCloseCircle className='text-3xl text-red-600 dark:text-red-400' />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow-lg dark:shadow-none'>
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1 relative'>
              <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500' />
              <input
                type='text'
                placeholder='Search by name or email...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-blue-500 dark:focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all'
              />
            </div>

            {/* Status Filter */}
            <div className='relative'>
              <FiFilter className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500' />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value as 'ALL' | 'active' | 'inactive'
                  );
                  setCurrentPage(1);
                }}
                className='pl-11 pr-10 py-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-blue-500 dark:focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer'
              >
                <option value='ALL'>All Status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className='mt-3 text-sm text-gray-600 dark:text-gray-400'>
            Showing {users?.length}  of {metaData?.total} users
          </div>
        </div>

        {/* Users Table */}
        <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none overflow-hidden'>
          {/* Desktop Table */}
          <div className='hidden md:block overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Role
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Joined
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-white/10'>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className='hover:bg-gray-50 dark:hover:bg-white/5 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold'>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className='font-medium text-gray-900 dark:text-white'>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>
                      {user.email}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30'
                            : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30'
                        }`}
                      >
                        {user.role === 'ADMIN' ? (
                          <MdAdminPanelSettings />
                        ) : (
                          <FiUsers />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/30'
                            : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/30'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <AiOutlineCheckCircle />
                        ) : (
                          <AiOutlineCloseCircle />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className='px-6 py-4'>
                      <select
                        value={user.status}
                        onChange={(e) =>
                          handleStatusChange(
                            user.id,
                            e.target.value as 'active' | 'inactive'
                          )
                        }
                        className='px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
                      >
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='md:hidden divide-y divide-gray-200 dark:divide-white/10'>
            {users.map((user) => (
              <div key={user.id} className='p-4 space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg'>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-900 dark:text-white'>
                      {user.name}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30'
                        : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30'
                    }`}
                  >
                    {user.role === 'ADMIN' ? (
                      <MdAdminPanelSettings />
                    ) : (
                      <FiUsers />
                    )}
                    {user.role}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/30'
                        : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/30'
                    }`}
                  >
                    {user.status === 'active' ? (
                      <AiOutlineCheckCircle />
                    ) : (
                      <AiOutlineCloseCircle />
                    )}
                    {user.status}
                  </span>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <select
                  value={user.status}
                  onChange={(e) =>
                    handleStatusChange(
                      user.id,
                      e.target.value as 'active' | 'inactive'
                    )
                  }
                  className='w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all'
                >
                  <option value='active'>Set Active</option>
                  <option value='inactive'>Set Inactive</option>
                </select>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className='text-center py-12'>
              <FiUsers className='mx-auto text-5xl text-gray-400 dark:text-gray-600 mb-3' />
              <p className='text-gray-600 dark:text-gray-400'>No users found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {metaData && metaData?.totalPages > 1 && (
          <div className='backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow-lg dark:shadow-none'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Page {currentPage} of {metaData.totalPages}
              </p>
              <div className='flex gap-2'>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className='p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <FiChevronLeft />
                </button>
                {Array.from(
                  { length: metaData.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(metaData.totalPages, p + 1))
                  }
                  disabled={currentPage === metaData.totalPages}
                  className='p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUserClient;
