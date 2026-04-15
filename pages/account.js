import SignIn from '../components/SignIn';
import { useUser } from '../components/User';
import Dashboard from '../components/Dashboard';

export default function AccountPage() {
  const user = useUser();
  return (
    <div>
      {!user && <SignIn />}
      {user && <Dashboard />}
    </div>
  );
}