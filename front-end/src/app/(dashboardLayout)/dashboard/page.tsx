import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import UserDashboard from '@/components/Dashboard/UserDashboard';
import { getAuth } from '@/helpers/getAuth';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard Page',
};

const Dashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const getMe = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  };

  const me = await getAuth();

  return (
    <div>
      {me.data?.role === 'ADMIN' && (
       <AdminDashboard/>
      )}
      {me.data?.role === 'USER' && (
       <UserDashboard/>
      )}
    </div>
  );
};

export default Dashboard;
