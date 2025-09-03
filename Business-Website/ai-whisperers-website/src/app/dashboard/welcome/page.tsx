import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import WelcomeDashboard from '@/components/dashboard/WelcomeDashboard';

export default async function WelcomePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/signin');
  }

  return <WelcomeDashboard user={user} />;
}