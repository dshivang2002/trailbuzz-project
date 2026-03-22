import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Calendar, Menu, LogOut } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_bookings: 0,
    total_packages: 0,
    total_inquiries: 0,
    total_revenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        axios.get(`${API_URL}/stats/dashboard`),
        axios.get(`${API_URL}/bookings`)
      ]);
      setStats(statsRes.data);
      setRecentBookings(bookingsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const kpiCards = [
    { title: 'Total Bookings', value: stats.total_bookings, icon: ShoppingCart, color: 'bg-blue-500', change: '+12%' },
    { title: 'Active Packages', value: stats.total_packages, icon: Package, color: 'bg-green-500', change: '+3' },
    { title: 'Total Revenue', value: formatCurrency(stats.total_revenue), icon: DollarSign, color: 'bg-orange-500', change: '+18%' },
    { title: 'Inquiries', value: stats.total_inquiries, icon: Users, color: 'bg-purple-500', change: '+5' }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 61000 },
    { name: 'Apr', revenue: 58000 },
    { name: 'May', revenue: 72000 },
    { name: 'Jun', revenue: 85000 }
  ];

  const bookingStatusData = [
    { name: 'Confirmed', value: 45, color: '#22C55E' },
    { name: 'Pending', value: 30, color: '#F97316' },
    { name: 'Cancelled', value: 10, color: '#EF4444' }
  ];

  const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Packages', path: '/admin/packages' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Blog', path: '/admin/blogs' },
    { name: 'Vehicles', path: '/admin/vehicles' },
    { name: 'Settings', path: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A3C6E]">Yatrika Admin</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[#475569]">Welcome, {user?.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Nav */}
        <div className="flex flex-wrap gap-3 mb-8">
          {adminNav.map(item => (
            <Button
              key={item.path}
              asChild
              variant="outline"
              className="rounded-full"
            >
              <Link to={item.path}>{item.name}</Link>
            </Button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${kpi.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-sm text-[#22C55E] font-semibold">{kpi.change}</span>
                </div>
                <p className="text-sm text-[#475569] mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold text-[#1A3C6E]">{kpi.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="p-6 border-0 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1A3C6E] mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1A3C6E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Booking Status Pie */}
          <Card className="p-6 border-0 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1A3C6E] mb-4">Booking Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="text-lg font-semibold text-[#1A3C6E] mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#475569]">Booking ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#475569]">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#475569]">Package</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#475569]">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#475569]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm">{booking.booking_id}</td>
                      <td className="py-3 px-4 text-sm">{booking.traveler.full_name}</td>
                      <td className="py-3 px-4 text-sm">{booking.package_name}</td>
                      <td className="py-3 px-4 text-sm font-semibold">{formatCurrency(booking.total_amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.booking_status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.booking_status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-[#475569]">
                      No recent bookings
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Button asChild variant="outline">
              <Link to="/admin/bookings">View All Bookings →</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
