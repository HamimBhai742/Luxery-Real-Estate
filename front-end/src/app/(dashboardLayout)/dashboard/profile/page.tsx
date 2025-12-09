import Profile from '@/components/Profile/Profile';
export const metadata = {
  title: 'Profile',
  description: 'Manage and track all your property reservations',
}
const ProfilePage = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
