import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import UserDashboard from '@/components/Dashboard/UserDashboard';
import { getAuth } from '@/helpers/getAuth';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard Page',
};

const Dashboard = async () => {
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
