import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import UserDashboard from '@/components/Dashboard/UserDashboard';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard Page',
};

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

const Dashboard = async () => {
  const me = await getMe();
  console.log(me);
  return (
    <div>
      <h1 className='sm:text-7xl text-4xl font-bold'>Comming Soon.........</h1>
      {me.role === 'ADMIN' && (
       <AdminDashboard/>
      )}
      {me.role === 'USER' && (
       <UserDashboard/>
      )}
    </div>
  );
};

export default Dashboard;
