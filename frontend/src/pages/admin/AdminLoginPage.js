import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const LOGO_URL = 'https://customer-assets.emergentagent.com/job_4ce86279-3a36-4bbd-9264-6b6ce64e676c/artifacts/e3m79p4w_YATRIKA_transparent.png';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C6E] to-[#0f2744] flex items-center justify-center p-4" data-testid="admin-login-page">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="Yatrika" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1A3C6E] mb-2">Admin Portal</h1>
          <p className="text-[#475569]">Sign in to manage your travel business</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@yatrika.com"
              data-testid="admin-email-input"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              data-testid="admin-password-input"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A3C6E] hover:bg-[#142d54] text-white"
            data-testid="admin-login-btn"
          >
            {loading ? 'Signing in...' : (
              <>
                <LogIn size={20} className="mr-2" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-[#475569] hover:text-[#1A3C6E]">
            ← Back to Website
          </Link>
        </div>

        <div className="mt-8 p-4 bg-[#FDFBF7] rounded-lg">
          <p className="text-xs text-[#475569] text-center">
            <strong>Demo Credentials:</strong><br />
            Email: admin@yatrika.com<br />
            Password: admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
