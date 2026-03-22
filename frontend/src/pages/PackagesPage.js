import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedTourType, setSelectedTourType] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const tourTypes = ['Pilgrimage', 'Adventure', 'Honeymoon', 'Family', 'Heritage', 'Hill Station'];
  const states = ['Uttarakhand', 'Himachal Pradesh', 'Rajasthan', 'Uttar Pradesh'];

  useEffect(() => {
    fetchPackages();
  }, [selectedState, selectedTourType]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedState) params.append('state', selectedState);
      if (selectedTourType) params.append('tour_type', selectedTourType);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await axios.get(`${API_URL}/packages?${params}`);
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPackages();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="packages-page">
      {/* Header */}
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black font-['Poppins'] mb-4">Tour Packages Across India</h1>
          <p className="text-white/80">Explore our handpicked tours and create memories that last forever</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl border border-[#1A3C6E]/10 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-[#1A3C6E] mb-4 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#1A3C6E] mb-2 block">Search</label>
                <form onSubmit={handleSearch}>
                  <Input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="packages-search-input"
                  />
                </form>
              </div>

              {/* Destination State */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#1A3C6E] mb-2 block">Destination State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger data-testid="state-filter">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tour Type */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#1A3C6E] mb-3 block">Tour Type</label>
                <div className="space-y-3">
                  {tourTypes.map(type => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={type}
                        checked={selectedTourType === type}
                        onCheckedChange={(checked) => setSelectedTourType(checked ? type : '')}
                        data-testid={`tour-type-${type.toLowerCase()}`}
                      />
                      <label htmlFor={type} className="ml-2 text-sm text-[#475569] cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedState('');
                  setSelectedTourType('');
                  setSearchQuery('');
                }}
                variant="outline"
                className="w-full"
                data-testid="clear-filters-btn"
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-[#475569]">
                {packages.length} packages found
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#475569]">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="sort-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
                ))
              ) : packages.length > 0 ? (
                packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    to={`/tour-packages/${pkg.slug}`}
                    data-testid={`package-card-${pkg.slug}`}
                    className="package-card bg-white rounded-xl overflow-hidden border border-[#1A3C6E]/10 hover:border-[#F97316]/30"
                  >
                    <div className="package-image h-48 overflow-hidden relative">
                      <img
                        src={pkg.featured_image || pkg.images[0]}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#F97316] text-xs font-semibold rounded-full">
                          {pkg.tour_type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-[#1A3C6E] flex-1">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center text-sm text-[#475569] ml-2">
                          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-[#475569] mb-3">
                        <MapPin size={16} className="mr-1" />
                        <span>{pkg.destination_city}, {pkg.destination_state}</span>
                      </div>

                      <div className="flex items-center text-sm text-[#475569] mb-4">
                        <Calendar size={16} className="mr-1" />
                        <span>{pkg.duration_days}D / {pkg.duration_nights}N</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                          <span className="text-xs text-[#475569]">Starting from</span>
                          <div className="text-2xl font-bold text-[#1A3C6E]">{formatCurrency(pkg.price_per_person)}</div>
                        </div>
                        <Button className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-[#475569] text-lg">No packages found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSelectedState('');
                      setSelectedTourType('');
                      setSearchQuery('');
                    }}
                    className="mt-4 bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
