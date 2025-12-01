'use client';
import React from 'react';
import { FaHome, FaUsers, FaCalendarCheck, FaDollarSign, FaClock, FaPlus, FaEdit, FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

const AdminDashboard = () => {
  const stats = [
    { icon: FaHome, label: 'Total Properties', value: '156', change: '+12%', color: 'from-blue-500 to-cyan-500' },
    { icon: FaUsers, label: 'Total Users', value: '2,847', change: '+8%', color: 'from-purple-500 to-pink-500' },
    { icon: FaCalendarCheck, label: 'Active Bookings', value: '89', change: '+23%', color: 'from-green-500 to-emerald-500' },
    { icon: FaDollarSign, label: 'Revenue', value: '$124K', change: '+15%', color: 'from-orange-500 to-red-500' },
  ];

  const quickActions = [
    { icon: FaPlus, label: 'Add Property', href: '/dashboard/create-property', color: 'from-blue-500 to-cyan-500' },
    { icon: FaEdit, label: 'Manage Properties', href: '/dashboard/manage-property', color: 'from-purple-500 to-pink-500' },
    { icon: FaUsers, label: 'Manage Users', href: '/dashboard/manage-users', color: 'from-green-500 to-emerald-500' },
    { icon: FaEye, label: 'View All', href: '/properties', color: 'from-orange-500 to-red-500' },
  ];

  const recentProperties = [
    { name: 'Luxury Villa', location: 'Beverly Hills', price: '$2.5M', status: 'Active' },
    { name: 'Modern Apartment', location: 'Manhattan', price: '$1.2M', status: 'Active' },
    { name: 'Beach House', location: 'Malibu', price: '$3.8M', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-purple-500/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
              <select className="bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 70, 45, 80, 60, 90, 75].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg hover:from-purple-400 hover:to-blue-400 transition-all duration-300" style={{ height: `${height}%` }}></div>
                  <span className="text-gray-600 dark:text-gray-400 text-xs">Day {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'New booking', time: '2 min ago', icon: FaCalendarCheck, color: 'text-green-600 dark:text-green-400' },
                { action: 'Property added', time: '15 min ago', icon: FaHome, color: 'text-blue-600 dark:text-blue-400' },
                { action: 'User registered', time: '1 hour ago', icon: FaUsers, color: 'text-purple-600 dark:text-purple-400' },
                { action: 'Payment received', time: '2 hours ago', icon: FaDollarSign, color: 'text-orange-600 dark:text-orange-400' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300">
                  <activity.icon className={`text-xl ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-1">
                      <FaClock className="text-xs" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-105 shadow hover:shadow-lg dark:shadow-none"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="text-white text-xl" />
                </div>
                <span className="text-gray-900 dark:text-white font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Properties */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Properties</h2>
            <Link href="/dashboard/manage-property" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left text-gray-600 dark:text-gray-400 font-medium py-3 px-4">Property</th>
                  <th className="text-left text-gray-600 dark:text-gray-400 font-medium py-3 px-4">Location</th>
                  <th className="text-left text-gray-600 dark:text-gray-400 font-medium py-3 px-4">Price</th>
                  <th className="text-left text-gray-600 dark:text-gray-400 font-medium py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProperties.map((property, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">{property.name}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400" />
                      {property.location}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-semibold">{property.price}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.status === 'Active' 
                          ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30' 
                          : 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
