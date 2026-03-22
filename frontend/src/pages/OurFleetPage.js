import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Wind, Settings, CheckCircle, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { formatCurrency } from '@/lib/utils';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const OurFleetPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="fleet-page">
      {/* Hero */}
      <div className="bg-[#1A3C6E] text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Our Fleet', path: '/our-fleet' }]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] mb-4">
            Our Fleet
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Travel in comfort and style with our well-maintained, modern fleet of vehicles
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-[#475569] leading-relaxed">
            At Yatrika, we understand that your journey is as important as your destination. 
            That's why we maintain a diverse fleet of modern, comfortable, and well-maintained vehicles 
            to suit every group size and travel need. All our vehicles come with experienced drivers, 
            GPS navigation, and comprehensive insurance.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
            ))
          ) : vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="overflow-hidden border-[#1A3C6E]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`vehicle-${vehicle.id}`}
              >
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={vehicle.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1A3C6E] mb-2">{vehicle.name}</h3>
                  <p className="text-[#475569] mb-4">{vehicle.model}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-[#475569]">
                      <Users size={18} className="mr-2 text-[#F97316]" />
                      <span>Capacity: {vehicle.capacity} seats</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475569]">
                      <Wind size={18} className="mr-2 text-[#F97316]" />
                      <span>{vehicle.ac_type}</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475569]">
                      <Settings size={18} className="mr-2 text-[#F97316]" />
                      <span>₹{vehicle.price_per_km}/km</span>
                    </div>
                  </div>

                  {vehicle.features && vehicle.features.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-[#1A3C6E] mb-2">Features:</p>
                      <div className="space-y-1">
                        {vehicle.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start text-sm text-[#475569]">
                            <CheckCircle size={16} className="mr-2 text-[#22C55E] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-[#475569] mb-3">
                      <strong>Best For:</strong> {vehicle.best_for}
                    </p>
                    <Button
                      asChild
                      className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full"
                    >
                      <Link to="/booking">Book with this Vehicle</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-[#475569]">No vehicles available at the moment.</p>
            </div>
          )}
        </div>

        {/* Why Choose Our Fleet */}
        <div className="bg-white rounded-2xl p-12 border border-[#1A3C6E]/10">
          <h2 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] mb-8 text-center">
            Why Choose Our Fleet?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316]/10 rounded-full mb-4">
                <CheckCircle size={32} className="text-[#F97316]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A3C6E] mb-3">Well-Maintained</h3>
              <p className="text-[#475569]">All vehicles undergo regular maintenance and safety checks</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316]/10 rounded-full mb-4">
                <Users size={32} className="text-[#F97316]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A3C6E] mb-3">Experienced Drivers</h3>
              <p className="text-[#475569]">Professional, courteous drivers with local route knowledge</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316]/10 rounded-full mb-4">
                <Shield size={32} className="text-[#F97316]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A3C6E] mb-3">Fully Insured</h3>
              <p className="text-[#475569]">Comprehensive insurance coverage for your peace of mind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFleetPage;
