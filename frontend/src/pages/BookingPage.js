import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useBooking } from '@/context/BookingContext';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BookingPage = () => {
  const navigate = useNavigate();
  const { bookingData, updateBookingData, currentStep, setCurrentStep } = useBooking();
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPackages();
    fetchVehicles();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  };

  const handlePackageChange = (packageId) => {
    const selectedPkg = packages.find(p => p.id === packageId);
    if (selectedPkg) {
      updateBookingData({
        package_id: selectedPkg.id,
        package_name: selectedPkg.name,
        base_price: selectedPkg.price_per_person
      });
    }
  };

  const handleVehicleSelect = (vehicle) => {
    const vehicleCharges = vehicle.price_per_km * 500; // Placeholder calculation
    const taxAmount = (bookingData.base_price * bookingData.num_adults + vehicleCharges) * 0.05;
    const total = bookingData.base_price * bookingData.num_adults + vehicleCharges + taxAmount;
    const advance = total * 0.25;

    updateBookingData({
      vehicle_id: vehicle.id,
      vehicle_name: vehicle.name,
      vehicle_charges: vehicleCharges,
      tax_amount: taxAmount,
      total_amount: total,
      advance_paid: advance
    });
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      toast.success('Booking created successfully!');
      // Here you would initiate payment
      toast.info('Payment gateway integration coming soon. Booking ID: ' + response.data.booking_id);
      navigate('/');
    } catch (error) {
      console.error('Booking failed', error);
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Trip Details' },
    { number: 2, title: 'Traveler Info' },
    { number: 3, title: 'Vehicle Selection' },
    { number: 4, title: 'Payment' }
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12" data-testid="booking-page">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center ${step.number < steps.length ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number
                      ? 'bg-[#1A3C6E] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  data-testid={`step-${step.number}`}
                >
                  {currentStep > step.number ? <Check size={20} /> : step.number}
                </div>
                {step.number < steps.length && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      currentStep > step.number ? 'bg-[#1A3C6E]' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`${
                  currentStep >= step.number ? 'text-[#1A3C6E] font-semibold' : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        {/* Step 1: Trip Details */}
        {currentStep === 1 && (
          <Card className="p-8" data-testid="step-trip-details">
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-6">Trip Details</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="package">Select Package *</Label>
                <Select
                  value={bookingData.package_id}
                  onValueChange={handlePackageChange}
                >
                  <SelectTrigger data-testid="package-select">
                    <SelectValue placeholder="Choose a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map(pkg => (
                      <SelectItem key={pkg.id} value={pkg.id}>{pkg.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="travel_date">Travel Start Date *</Label>
                <Input
                  type="date"
                  id="travel_date"
                  value={bookingData.travel_start_date}
                  onChange={(e) => updateBookingData({ travel_start_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  data-testid="travel-date-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="num_adults">Number of Adults *</Label>
                  <Input
                    type="number"
                    id="num_adults"
                    min="1"
                    value={bookingData.num_adults}
                    onChange={(e) => updateBookingData({ num_adults: parseInt(e.target.value) })}
                    data-testid="num-adults-input"
                  />
                </div>
                <div>
                  <Label htmlFor="num_children">Number of Children</Label>
                  <Input
                    type="number"
                    id="num_children"
                    min="0"
                    value={bookingData.num_children}
                    onChange={(e) => updateBookingData({ num_children: parseInt(e.target.value) })}
                    data-testid="num-children-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location *</Label>
                  <Input
                    id="pickup"
                    value={bookingData.pickup_location}
                    onChange={(e) => updateBookingData({ pickup_location: e.target.value })}
                    placeholder="Enter pickup location"
                    data-testid="pickup-input"
                  />
                </div>
                <div>
                  <Label htmlFor="drop">Drop Location *</Label>
                  <Input
                    id="drop"
                    value={bookingData.drop_location}
                    onChange={(e) => updateBookingData({ drop_location: e.target.value })}
                    placeholder="Enter drop location"
                    data-testid="drop-input"
                  />
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white"
                data-testid="next-step-btn"
              >
                Next: Traveler Information
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Traveler Info */}
        {currentStep === 2 && (
          <Card className="p-8" data-testid="step-traveler-info">
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-6">Traveler Information</h2>
            <div className="space-y-6">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={bookingData.traveler.full_name}
                  onChange={(e) => updateBookingData({
                    traveler: { ...bookingData.traveler, full_name: e.target.value }
                  })}
                  data-testid="traveler-name-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={bookingData.traveler.email}
                    onChange={(e) => updateBookingData({
                      traveler: { ...bookingData.traveler, email: e.target.value }
                    })}
                    data-testid="traveler-email-input"
                  />
                </div>
                <div>
                  <Label>Mobile *</Label>
                  <Input
                    type="tel"
                    value={bookingData.traveler.mobile}
                    onChange={(e) => updateBookingData({
                      traveler: { ...bookingData.traveler, mobile: e.target.value }
                    })}
                    data-testid="traveler-mobile-input"
                  />
                </div>
              </div>

              <div>
                <Label>Address *</Label>
                <Input
                  value={bookingData.traveler.address}
                  onChange={(e) => updateBookingData({
                    traveler: { ...bookingData.traveler, address: e.target.value }
                  })}
                  data-testid="traveler-address-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ID Proof Type *</Label>
                  <Select
                    value={bookingData.traveler.id_proof_type}
                    onValueChange={(value) => updateBookingData({
                      traveler: { ...bookingData.traveler, id_proof_type: value }
                    })}
                  >
                    <SelectTrigger data-testid="id-proof-type-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ID Proof Number *</Label>
                  <Input
                    value={bookingData.traveler.id_proof_number}
                    onChange={(e) => updateBookingData({
                      traveler: { ...bookingData.traveler, id_proof_number: e.target.value }
                    })}
                    data-testid="id-proof-number-input"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                  data-testid="back-btn"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-[#F97316] hover:bg-[#ea580c] text-white"
                  data-testid="next-step-btn-2"
                >
                  Next: Select Vehicle
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Vehicle Selection */}
        {currentStep === 3 && (
          <Card className="p-8" data-testid="step-vehicle-selection">
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-6">Select Your Vehicle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`vehicle-card p-4 border-2 rounded-xl cursor-pointer ${
                    bookingData.vehicle_id === vehicle.id
                      ? 'selected border-[#22C55E]'
                      : 'border-[#1A3C6E]/10'
                  }`}
                  data-testid={`vehicle-option-${vehicle.id}`}
                >
                  <h3 className="text-lg font-semibold text-[#1A3C6E] mb-2">{vehicle.name}</h3>
                  <p className="text-sm text-[#475569] mb-2">Capacity: {vehicle.capacity} seats</p>
                  <p className="text-sm text-[#475569]">{vehicle.ac_type}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1"
                data-testid="back-btn-2"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                disabled={!bookingData.vehicle_id}
                className="flex-1 bg-[#F97316] hover:bg-[#ea580c] text-white"
                data-testid="next-step-btn-3"
              >
                Next: Payment
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Payment Summary */}
        {currentStep === 4 && (
          <Card className="p-8" data-testid="step-payment">
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-6">Booking Summary & Payment</h2>
            
            <div className="bg-[#FDFBF7] rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#1A3C6E] mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#475569]">Package:</span>
                  <span className="font-semibold">{bookingData.package_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Travel Date:</span>
                  <span className="font-semibold">{bookingData.travel_start_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Travelers:</span>
                  <span className="font-semibold">{bookingData.num_adults} Adults, {bookingData.num_children} Children</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Vehicle:</span>
                  <span className="font-semibold">{bookingData.vehicle_name}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FDFBF7] rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#1A3C6E] mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#475569]">Base Price ({bookingData.num_adults} persons)</span>
                  <span>{formatCurrency(bookingData.base_price * bookingData.num_adults)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Vehicle Charges</span>
                  <span>{formatCurrency(bookingData.vehicle_charges)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Taxes (5%)</span>
                  <span>{formatCurrency(bookingData.tax_amount)}</span>
                </div>
                <div className="border-t border-[#1A3C6E]/20 pt-3 flex justify-between text-lg font-bold">
                  <span className="text-[#1A3C6E]">Total Amount</span>
                  <span className="text-[#1A3C6E]">{formatCurrency(bookingData.total_amount)}</span>
                </div>
                <div className="flex justify-between text-[#F97316] font-semibold">
                  <span>Advance Payable Now (25%)</span>
                  <span>{formatCurrency(bookingData.advance_paid)}</span>
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>Balance Due</span>
                  <span>{formatCurrency(bookingData.total_amount - bookingData.advance_paid)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(3)}
                className="flex-1"
                data-testid="back-btn-3"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitBooking}
                disabled={loading}
                className="flex-1 bg-[#22C55E] hover:bg-[#16a34a] text-white"
                data-testid="pay-now-btn"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
