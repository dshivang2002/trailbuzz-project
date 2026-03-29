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
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#ea580c] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-3xl">TB</span>
            </div>
            <div className="text-left">
              <div className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] leading-none">
                Trailbuzz
              </div>
              <div className="text-sm text-[#F97316] font-medium">Buzz into Adventure</div>
            </div>
          </div>
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
              placeholder="admin@trailbuzz.com"
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
            Email: admin@trailbuzz.com<br />
            Password: admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
