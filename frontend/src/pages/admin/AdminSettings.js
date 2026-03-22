import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    business_name: 'Yatrika',
    tagline: 'Journey Beyond Limits',
    phone: '9198476606',
    email: 'dshivang208@gmail.com',
    whatsapp: '9198476606',
    address: '1004, Phase 4, Sector 59, Mohali, Punjab 160059',
    razorpay_key_id: '',
    razorpay_key_secret: '',
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    google_analytics_id: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchSettings();
  }, [user, navigate]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/settings`);
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to fetch settings', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/settings`, settings);
      toast.success('Settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#1A3C6E]">Settings</h1>
          <Button onClick={() => navigate('/admin/dashboard')} variant="outline">\u2190 Back to Dashboard</Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Info */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1A3C6E] mb-4">Business Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Business Name</Label>
                  <Input value={settings.business_name} onChange={(e) => setSettings({...settings, business_name: e.target.value})} />
                </div>
                <div>
                  <Label>Tagline</Label>
                  <Input value={settings.tagline} onChange={(e) => setSettings({...settings, tagline: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Input value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} />
              </div>
            </div>
          </Card>

          {/* Payment Gateway */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1A3C6E] mb-4">Razorpay Payment Gateway</h2>
            <div className="space-y-4">
              <div>
                <Label>Razorpay Key ID</Label>
                <Input value={settings.razorpay_key_id} onChange={(e) => setSettings({...settings, razorpay_key_id: e.target.value})} placeholder="rzp_test_..." />
              </div>
              <div>
                <Label>Razorpay Key Secret</Label>
                <Input type="password" value={settings.razorpay_key_secret} onChange={(e) => setSettings({...settings, razorpay_key_secret: e.target.value})} placeholder="Enter secret key" />
              </div>
              <p className="text-xs text-[#475569]">Get your Razorpay keys from <a href="https://dashboard.razorpay.com" target="_blank" rel="noopener noreferrer" className="text-[#F97316] underline">Razorpay Dashboard</a></p>
            </div>
          </Card>

          {/* Email Configuration */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1A3C6E] mb-4">Email Configuration (SMTP)</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>SMTP Host</Label>
                  <Input value={settings.smtp_host} onChange={(e) => setSettings({...settings, smtp_host: e.target.value})} placeholder="smtp.gmail.com" />
                </div>
                <div>
                  <Label>SMTP Port</Label>
                  <Input type="number" value={settings.smtp_port} onChange={(e) => setSettings({...settings, smtp_port: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>SMTP Username</Label>
                  <Input value={settings.smtp_username} onChange={(e) => setSettings({...settings, smtp_username: e.target.value})} placeholder="your@email.com" />
                </div>
                <div>
                  <Label>SMTP Password</Label>
                  <Input type="password" value={settings.smtp_password} onChange={(e) => setSettings({...settings, smtp_password: e.target.value})} placeholder="App password" />
                </div>
              </div>
            </div>
          </Card>

          {/* Analytics */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1A3C6E] mb-4">Analytics</h2>
            <div>
              <Label>Google Analytics ID</Label>
              <Input value={settings.google_analytics_id} onChange={(e) => setSettings({...settings, google_analytics_id: e.target.value})} placeholder="G-XXXXXXXXXX" />
            </div>
          </Card>

          <Button type="submit" disabled={loading} className="w-full bg-[#1A3C6E] hover:bg-[#142d54] text-white">
            <Save size={20} className="mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
