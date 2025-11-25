import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Luxury Real Estate',
  description: 'Sign in or create an account to access exclusive luxury properties',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
