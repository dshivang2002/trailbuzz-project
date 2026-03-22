import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, Users, Star, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatCurrency } from '@/lib/utils';
import { useBooking } from '@/context/BookingContext';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PackageDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [pkg, setPkg] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetchPackageDetails();
    fetchVehicles();
  }, [slug]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages/slug/${slug}`);
      setPkg(response.data);
    } catch (error) {
      console.error('Failed to fetch package', error);
      toast.error('Package not found');
    } finally {
      setLoading(false);
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

  const handleBookNow = () => {
    if (!pkg) return;
    
    updateBookingData({
      package_id: pkg.id,
      package_name: pkg.name,
      base_price: pkg.price_per_person
    });
    
    navigate('/booking');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">Package Not Found</h2>
          <Button asChild>
            <Link to="/tour-packages">Browse All Packages</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="package-detail-page">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-96 md:h-[500px] overflow-hidden rounded-xl">
              <img
                src={pkg.featured_image || pkg.images[0]}
                alt={pkg.name}
                className="w-full h-full object-cover"
                data-testid="package-featured-image"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {pkg.images.slice(1, 5).map((image, index) => (
                <div key={index} className="h-44 md:h-60 overflow-hidden rounded-xl">
                  <img src={image} alt={`${pkg.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8 mb-8 lg:mb-0">
            {/* Package Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#F97316]/10 text-[#F97316] text-sm font-semibold rounded-full">
                  {pkg.tour_type}
                </span>
                <div className="flex items-center text-sm text-[#475569]">
                  <MapPin size={16} className="mr-1" />
                  <span>{pkg.destination_city}, {pkg.destination_state}</span>
                </div>
                <div className="flex items-center text-sm text-[#475569]">
                  <Calendar size={16} className="mr-1" />
                  <span>{pkg.duration_days}D / {pkg.duration_nights}N</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">
                {pkg.name}
              </h1>
              
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(pkg.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-[#475569]">({pkg.review_count} reviews)</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6 mb-8">
              <h3 className="text-xl font-semibold text-[#1A3C6E] mb-4">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <Check size={20} className="text-[#22C55E] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#475569]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-4" data-testid="package-tabs">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6">
                  <h3 className="text-xl font-semibold text-[#1A3C6E] mb-4">Overview</h3>
                  <p className="text-[#475569] leading-relaxed">{pkg.overview}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="mt-6">
                <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6">
                  <h3 className="text-xl font-semibold text-[#1A3C6E] mb-4">Day-wise Itinerary</h3>
                  <Accordion type="single" collapsible className="space-y-4">
                    {pkg.itinerary.map((day) => (
                      <AccordionItem key={day.day} value={`day-${day.day}`}>
                        <AccordionTrigger className="text-left">
                          <div>
                            <span className="text-[#F97316] font-semibold">Day {day.day}</span>
                            <span className="text-[#1A3C6E] font-medium ml-3">{day.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-[#475569] mb-3">{day.description}</p>
                          {day.activities && day.activities.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 text-[#475569]">
                              {day.activities.map((activity, i) => (
                                <li key={i}>{activity}</li>
                              ))}
                            </ul>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="inclusions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6">
                    <h3 className="text-xl font-semibold text-[#22C55E] mb-4 flex items-center">
                      <Check size={24} className="mr-2" />
                      Inclusions
                    </h3>
                    <ul className="space-y-2">
                      {pkg.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={18} className="text-[#22C55E] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-[#475569]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6">
                    <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                      <X size={24} className="mr-2" />
                      Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {pkg.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <X size={18} className="text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-[#475569]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="vehicles" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.filter(v => pkg.available_vehicles.includes(v.id)).map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="vehicle-card bg-white rounded-xl border border-[#1A3C6E]/10 p-6"
                      data-testid={`vehicle-${vehicle.id}`}
                    >
                      <div className="h-40 overflow-hidden rounded-lg mb-4">
                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-lg font-semibold text-[#1A3C6E] mb-2">{vehicle.name}</h4>
                      <p className="text-sm text-[#475569] mb-3">{vehicle.model}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-[#475569]">Capacity: {vehicle.capacity} seats</div>
                          <div className="text-sm text-[#475569]">{vehicle.ac_type}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>

          {/* Sticky Booking Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-sm text-[#475569]">Starting from</span>
                <div className="flex items-baseline">
                  <div className="text-4xl font-black text-[#1A3C6E]">{formatCurrency(pkg.price_per_person)}</div>
                  <span className="text-[#475569] ml-2">/ person</span>
                </div>
                {pkg.original_price && (
                  <div className="text-lg text-[#475569] line-through mt-1">
                    {formatCurrency(pkg.original_price)}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#475569]">Duration</span>
                  <span className="font-semibold text-[#1A3C6E]">{pkg.duration_days}D / {pkg.duration_nights}N</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#475569]">Group Size</span>
                  <span className="font-semibold text-[#1A3C6E]">{pkg.min_group_size} - {pkg.max_group_size}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#475569]">Difficulty</span>
                  <span className="font-semibold text-[#1A3C6E]">{pkg.difficulty_level}</span>
                </div>
              </div>

              <Button
                onClick={handleBookNow}
                data-testid="book-now-btn"
                className="w-full h-12 bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full text-base font-semibold"
              >
                Book Now
              </Button>

              <p className="text-xs text-[#475569] text-center mt-4">
                * Final price may vary based on travel dates and vehicle selection
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Fixed Mobile Book Now Button */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-[#475569]">From</span>
            <div className="text-2xl font-bold text-[#1A3C6E]">{formatCurrency(pkg.price_per_person)}</div>
          </div>
          <Button
            onClick={handleBookNow}
            data-testid="mobile-book-now-btn"
            className="h-12 px-8 bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
