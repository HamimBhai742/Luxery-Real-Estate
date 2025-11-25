import NavbarCard from './NavbarCard';
const Navbar = async () => {
  const me = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    cache: 'no-store',
  });
  const currentUser = await me.json();
  return (
    <nav>
      <NavbarCard me={currentUser} />
    </nav>
  );
};

export default Navbar;
