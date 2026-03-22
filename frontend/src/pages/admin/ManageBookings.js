import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Search, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ManageBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchQuery, statusFilter]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.booking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.traveler.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.package_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.booking_status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`${API_URL}/bookings/${bookingId}/status`, newStatus, {
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success('Booking status updated successfully');
      fetchBookings();
    } catch (error) {
      console.error('Failed to update status', error);
      toast.error('Failed to update booking status');
    }
  };

  const exportToCSV = () => {
    const headers = ['Booking ID', 'Customer', 'Email', 'Phone', 'Package', 'Date', 'Amount', 'Status'];
    const rows = filteredBookings.map(b => [
      b.booking_id,
      b.traveler.full_name,
      b.traveler.email,
      b.traveler.mobile,
      b.package_name,
      b.travel_start_date,
      b.total_amount,
      b.booking_status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV exported successfully');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E]">Manage Bookings</h1>
            <p className="text-[#475569] mt-2">Total: {filteredBookings.length} bookings</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="outline"
            >
              ← Back to Dashboard
            </Button>
            <Button
              onClick={exportToCSV}
              className="bg-[#22C55E] hover:bg-[#16a34a] text-white"
            >
              <Download size={20} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 border-0 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search by booking ID, customer, or package..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Bookings Table */}
        <Card className="p-6 border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Booking ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Customer</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Package</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Travel Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#475569]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center">
                      <div className="spinner mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-mono">{booking.booking_id}</td>
                      <td className="py-4 px-4 text-sm">
                        <div>
                          <div className="font-medium">{booking.traveler.full_name}</div>
                          <div className="text-xs text-[#475569]">{booking.traveler.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">{booking.package_name}</td>
                      <td className="py-4 px-4 text-sm">{booking.travel_start_date}</td>
                      <td className="py-4 px-4 text-sm font-semibold">{formatCurrency(booking.total_amount)}</td>
                      <td className="py-4 px-4">
                        <Select
                          value={booking.booking_status}
                          onValueChange={(value) => updateBookingStatus(booking.booking_id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[#475569]">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.booking_id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#1A3C6E] mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#475569]">Name:</span>
                    <p className="font-medium">{selectedBooking.traveler.full_name}</p>
                  </div>
                  <div>
                    <span className="text-[#475569]">Email:</span>
                    <p className="font-medium">{selectedBooking.traveler.email}</p>
                  </div>
                  <div>
                    <span className="text-[#475569]">Phone:</span>
                    <p className="font-medium">{selectedBooking.traveler.mobile}</p>
                  </div>
                  <div>
                    <span className="text-[#475569]">Address:</span>
                    <p className="font-medium">{selectedBooking.traveler.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#1A3C6E] mb-3">Trip Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#475569]">Package:</span>
                    <p className="font-medium">{selectedBooking.package_name}</p>
                  </div>
                  <div>
                    <span className="text-[#475569]">Travel Date:</span>
                    <p className="font-medium">{selectedBooking.travel_start_date}</p>
                  </div>
                  <div>
                    <span className="text-[#475569]">Travelers:</span>
                    <p className="font-medium">{selectedBooking.num_adults} Adults, {selectedBooking.num_children} Children</p>
                  </div>
                  <div>
                    <span className="text-[#475569]">Vehicle:</span>
                    <p className="font-medium">{selectedBooking.vehicle_name}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#1A3C6E] mb-3">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Base Price:</span>
                    <span className="font-medium">{formatCurrency(selectedBooking.base_price * selectedBooking.num_adults)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Vehicle Charges:</span>
                    <span className="font-medium">{formatCurrency(selectedBooking.vehicle_charges)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Tax:</span>
                    <span className="font-medium">{formatCurrency(selectedBooking.tax_amount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t pt-2">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(selectedBooking.total_amount)}</span>
                  </div>
                  <div className="flex justify-between text-[#22C55E]">
                    <span>Advance Paid:</span>
                    <span className="font-semibold">{formatCurrency(selectedBooking.advance_paid)}</span>
                  </div>
                  <div className="flex justify-between text-[#F97316]">
                    <span>Balance Due:</span>
                    <span className="font-semibold">{formatCurrency(selectedBooking.total_amount - selectedBooking.advance_paid)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBookings;
