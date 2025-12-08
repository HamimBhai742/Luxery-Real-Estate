'use client';
import { useState, useEffect } from 'react';
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiLock,
  FiCamera,
  FiSun,
  FiMoon,
  FiCheck,
  FiX,
  FiEdit2,
  FiShield,
} from 'react-icons/fi';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import Image from 'next/image';
import ProfileSkeleton from './ProfileSkeleton';
import { changePassword } from '@/helpers/changePass';
import { ImSpinner9 } from 'react-icons/im';
import { getMe } from '@/helpers/getMe';
import { updateProfile } from '@/helpers/updateProfile';

interface User {
  name: string;
  email: string;
  address?: string;
  photo?: string;
  role: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const { theme, setTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    profile: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    match: false,
    length: false,
    touched: false,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (passwordData.confirmPassword || passwordData.newPassword) {
      setPasswordErrors({
        match:
          passwordData.newPassword === passwordData.confirmPassword &&
          passwordData.confirmPassword !== '',
        length: passwordData.newPassword.length >= 6,
        touched: true,
      });
    }
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      if (data.success) {
        setUser(data.data);
        setFormData({
          name: data.data.name,
          address: data.data.address || '',
          profile: data.data.profile || '',
        });
        setPhotoPreview(data.data.photo || '');
      }
    } catch {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    setProcessing(true);
    try {
      const data = await updateProfile(
        {
          name: formData.name,
          address: formData.address,
        },
        photoFile as File
      );
      console.log(data);
      if (data.success) {
        toast.success('Profile updated successfully');
        setEditing(false);
        setProcessing(false);
        fetchUser();
      }
      if (!data.success) {
        setProcessing(false);
        toast.error(data.message);
      }
    } catch {
      setProcessing(false);
      toast.error('Update failed');
    }
  };

  const handleChangePassword = async () => {
    setProcessing(true);
    if (!passwordErrors.match || !passwordErrors.length) {
      toast.error('Please fix password errors');
      return;
    }
    try {
      const data = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      console.log(data);
      if (data.success) {
        toast.success('Password changed successfully');
        setChangingPassword(false);
        setProcessing(false);
      } else {
        setProcessing(false);
        toast.error(data.message);
      }
    } catch {
      setProcessing(false);

      toast.error('Password change failed');
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4'>
      <div className='max-w-5xl mx-auto'>
        {/* Header Card */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50'>
          <div className='relative h-48 bg-linear-to-r from-gray-600 via-purple-600 to-gray-600'>
            <div className='absolute inset-0 bg-black/10'></div>
            <div className='absolute top-4 right-4 flex gap-2'>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className='p-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all'
              >
                {theme === 'dark' ? (
                  <FiSun className='text-yellow-300 text-xl' />
                ) : (
                  <FiMoon className='text-white text-xl' />
                )}
              </button>
            </div>
          </div>

          <div className='relative px-8 pb-8'>
            {/* Profile Photo */}
            <div className='flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20'>
              <div className='relative group'>
                <div className='w-40 h-40 rounded-full border-8 border-white dark:border-gray-800 overflow-hidden bg-linear-to-br from-blue-400 to-purple-500 shadow-2xl'>
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt='Profile'
                      width={160}
                      height={160}
                      className='w-full h-full object-cover'
                    />
                  ) : formData.profile ? (
                    <Image
                      src={formData.profile ? formData.profile : photoPreview}
                      alt='Profile'
                      width={160}
                      height={160}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-white'>
                      <FiUser size={64} />
                    </div>
                  )}
                </div>
                {editing && (
                  <label className='absolute bottom-2 right-2 bg-linear-to-r from-blue-500 to-purple-600 p-3 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg'>
                    <FiCamera className='text-white text-lg' />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handlePhotoChange}
                      className='hidden'
                    />
                  </label>
                )}
              </div>

              <div className='flex-1 text-center md:text-left'>
                <h1 className='text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                  {user?.name}
                </h1>
                <div className='flex items-center justify-center md:justify-start gap-2 mb-3'>
                  <span className='px-4 py-1.5 rounded-full text-sm font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg capitalize flex items-center gap-2'>
                    <FiShield /> {user?.role}
                  </span>
                </div>
                <p className='text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2'>
                  <FiMail className='text-blue-500' /> {user?.email}
                </p>
              </div>

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className='px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold'
                >
                  <FiEdit2 /> Edit Profile
                </button>
              )}
            </div>

            {/* Form Section */}
            <div className='mt-8 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Name Field */}
                <div className='group'>
                  <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    <FiUser className='text-blue-500' /> Full Name
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!editing}
                    className='w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none'
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    <FiMail className='text-purple-500' /> Email Address
                  </label>
                  <input
                    type='email'
                    value={user?.email}
                    disabled
                    className='w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed'
                  />
                </div>

                {/* Address Field */}
                <div className='md:col-span-2'>
                  <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    <FiMapPin className='text-pink-500' /> Address
                  </label>
                  <input
                    type='text'
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    disabled={!editing}
                    className='w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none'
                  />
                </div>
              </div>

              {editing && (
                <div className='flex gap-3'>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={processing}
                    className='px-8 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center gap-2'
                  >
                    {processing ? (
                      <span className='flex items-center gap-2'>
                        <ImSpinner9 className='animate-spin' /> Saving....
                      </span>
                    ) : (
                      <span className='flex items-center gap-2'>
                        {' '}
                        <FiCheck /> Save Changes
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setPhotoFile(null);
                    }}
                    className='px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold flex items-center gap-2'
                  >
                    <FiX /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password Change Card */}
        <div className='mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50 p-8'>
          <button
            onClick={() => setChangingPassword(!changingPassword)}
            className='flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
          >
            <div className='p-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl'>
              <FiLock className='text-white' />
            </div>
            Change Password
          </button>

          {changingPassword && (
            <div className='mt-6 space-y-4'>
              <input
                type='password'
                placeholder='Current Password'
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className='w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none'
              />

              <div>
                <input
                  type='password'
                  placeholder='New Password (min 6 characters)'
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-4 transition-all outline-none ${
                    passwordErrors.touched && !passwordErrors.length
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {passwordErrors.touched && !passwordErrors.length && (
                  <p className='mt-2 text-sm text-red-500 flex items-center gap-2'>
                    <FiX className='text-red-500' /> Password must be at least 6
                    characters
                  </p>
                )}
                {passwordErrors.touched && passwordErrors.length && (
                  <p className='mt-2 text-sm text-green-500 flex items-center gap-2'>
                    <FiCheck className='text-green-500' /> Password length is
                    valid
                  </p>
                )}
              </div>

              <div>
                <input
                  type='password'
                  placeholder='Confirm New Password'
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-4 transition-all outline-none ${
                    passwordErrors.touched &&
                    passwordData.confirmPassword &&
                    !passwordErrors.match
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {passwordErrors.touched &&
                  passwordData.confirmPassword &&
                  !passwordErrors.match && (
                    <p className='mt-2 text-sm text-red-500 flex items-center gap-2 animate-pulse'>
                      <FiX className='text-red-500' /> Passwords do not match
                    </p>
                  )}
                {passwordErrors.touched && passwordErrors.match && (
                  <p className='mt-2 text-sm text-green-500 flex items-center gap-2'>
                    <FiCheck className='text-green-500' /> Passwords match
                  </p>
                )}
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  onClick={handleChangePassword}
                  disabled={
                    !passwordErrors.match ||
                    !passwordErrors.length ||
                    processing
                  }
                  className='px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {processing ? (
                    <span className='flex items-center gap-2'>
                      <ImSpinner9 className='animate-spin ' /> Updating...
                    </span>
                  ) : (
                    <span className='flex items-center gap-2'>
                      <FiCheck /> Update Password
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setChangingPassword(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                    setPasswordErrors({
                      match: false,
                      length: false,
                      touched: false,
                    });
                  }}
                  className='px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold flex items-center gap-2'
                >
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
