import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth0.getSession();
  if (!session) {
    redirect('/auth/login');
  }
  const user = session.user;
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <div className="mb-2">Welcome, {user.name}!</div>
      <div className="mb-2">Email: {user.email}</div>
      <div className="mb-2">Sub: {user.sub}</div>
      <a className="mt-4 underline text-blue-600" href="/">Back to Home</a>
    </main>
  );
} 