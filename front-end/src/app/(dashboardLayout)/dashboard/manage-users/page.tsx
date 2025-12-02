import ManageUserClient from '@/components/ManageUserClient';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Manage Users - Dashboard',
  description: 'Manage users in the dashboard',
};
const ManageUsers = async () => {
  return <ManageUserClient/>;
};

export default ManageUsers;
