import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Calendar, Users, Star, TrendingUp, Shield, Headphones, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HomePage = () => {
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const HERO_IMAGE = 'https://images.pexels.com/photos/6808521/pexels-photo-6808521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  const destinations = [
    {
      name: 'Uttarakhand',
      image: 'https://images.pexels.com/photos/36135640/pexels-photo-36135640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      tours: '25+ Tours',
      link: '/destinations/uttarakhand',
      gridClass: 'md:col-span-8 md:row-span-2'
    },
    {
      name: 'Himachal Pradesh',
      image: 'https://images.pexels.com/photos/36213405/pexels-photo-36213405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      tours: '30+ Tours',
      link: '/destinations/himachal-pradesh',
      gridClass: 'md:col-span-4'
    },
    {
      name: 'Rajasthan',
      image: 'https://images.pexels.com/photos/570031/pexels-photo-570031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      tours: '20+ Tours',
      link: '/destinations/rajasthan',
      gridClass: 'md:col-span-4'
    },
    {
      name: 'Uttar Pradesh',
      image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwzfHxpbmRpYSUyMHJhamFzdGhhbiUyMHBhbGFjZXxlbnwwfHx8fDE3NzQxMjIwOTJ8MA&ixlib=rb-4.1.0&q=85',
      tours: '15+ Tours',
      link: '/destinations/uttar-pradesh',
      gridClass: 'md:col-span-4'
    }
  ];

  const features = [
    {
      icon: Award,
      title: 'Expert Guides',
      description: 'Professional local guides with deep knowledge'
    },
    {
      icon: TrendingUp,
      title: 'Best Price Guarantee',
      description: 'Competitive pricing with no hidden charges'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support'
    },
    {
      icon: Shield,
      title: 'Safe Travel',
      description: '100% safety and secure journeys'
    }
  ];

  const stats = [
    { number: '500+', label: 'Tours Completed' },
    { number: '50+', label: 'Destinations' },
    { number: '10000+', label: 'Happy Travelers' },
    { number: '15+', label: 'Years Experience' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [packagesRes, testimonialsRes] = await Promise.all([
        axios.get(`${API_URL}/packages?status=featured&limit=6`),
        axios.get(`${API_URL}/testimonials?status=approved&limit=6`)
      ]);
      setPackages(packagesRes.data);
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tour-packages?search=${searchQuery}`;
    }
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center grain-texture" data-testid="hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-black font-['Poppins'] text-white mb-6 tracking-tight"
              data-testid="hero-heading"
            >
              Journey Beyond Limits
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover the magic of India with Trailbuzz. Expert-guided tours across breathtaking destinations.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto glass-morphism rounded-2xl p-6" data-testid="hero-search-bar">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search destinations or tours..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="search-input"
                    className="h-12 bg-white border-0 shadow-sm"
                  />
                </div>
                <Button
                  type="submit"
                  data-testid="search-button"
                  className="h-12 px-8 bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full"
                >
                  <Search size={20} className="mr-2" />
                  Search Tours
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]" data-testid="popular-packages-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">HANDPICKED FOR YOU</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3">
              Popular Tour Packages
            </h2>
            <p className="text-[#475569] mt-4 max-w-2xl mx-auto">
              Explore our most loved destinations and experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="package-image h-48 overflow-hidden">
                    <img
                      src={pkg.featured_image || pkg.images[0]}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold rounded-full">
                        {pkg.tour_type}
                      </span>
                      <div className="flex items-center text-sm text-[#475569]">
                        <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{pkg.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A3C6E] mb-2 line-clamp-2">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-[#475569] mb-4 line-clamp-2">{pkg.overview}</p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <span className="text-xs text-[#475569]">Starting from</span>
                        <div className="text-2xl font-bold text-[#1A3C6E]">{formatCurrency(pkg.price_per_person)}</div>
                      </div>
                      <Button className="bg-[#1A3C6E] hover:bg-[#142d54] text-white rounded-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-[#475569]">No packages available at the moment.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              data-testid="view-all-packages-btn"
              className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full px-8"
            >
              <Link to="/tour-packages">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Browse by Destination - Bento Grid */}
      <section className="py-16 md:py-24 bg-white" data-testid="destinations-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">EXPLORE INDIA</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3">
              Browse by Destination
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={dest.link}
                data-testid={`destination-card-${dest.name.toLowerCase().replace(' ', '-')}`}
                className={`${dest.gridClass} relative group overflow-hidden rounded-2xl h-64 md:h-80`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-white/80 text-sm">{dest.tours}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]" data-testid="why-choose-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">WHY TRAILBUZZ</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border border-[#1A3C6E]/10 p-8 text-center hover:shadow-lg transition-shadow"
                  data-testid={`feature-card-${index}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316]/10 rounded-full mb-6">
                    <Icon size={32} className="text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3C6E] mb-3">{feature.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 md:py-24 bg-[#1A3C6E] text-white" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-item-${index}`}>
                <div className="text-4xl md:text-5xl font-black font-['Poppins'] text-[#F97316] mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">REVIEWS</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3">
              What Our Travelers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="testimonial-card bg-[#FDFBF7] border border-[#1A3C6E]/10 p-6"
                  data-testid={`testimonial-${testimonial.id}`}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-[#0F172A] mb-6 leading-relaxed">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#1A3C6E] rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-[#1A3C6E]">{testimonial.name}</div>
                      <div className="text-sm text-[#475569]">{testimonial.location}</div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-[#475569]">No testimonials available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 bg-cover bg-center relative grain-texture"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481340101608-cb5f45cb1f99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtb3VudGFpbnMlMjB0cmVra2luZ3xlbnwwfHx8fDE3NzQxMjIwOTF8MA&ixlib=rb-4.1.0&q=85)'
        }}
        data-testid="cta-section"
      >
        <div className="absolute inset-0 bg-[#1A3C6E]/90"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-['Poppins'] text-white mb-6">
            Plan Your Dream Trip Today
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let our travel experts create a customized itinerary just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              data-testid="cta-book-now"
              className="h-12 px-8 bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full text-base"
            >
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button
              asChild
              data-testid="cta-contact"
              variant="outline"
              className="h-12 px-8 border-2 border-white text-white hover:bg-white hover:text-[#1A3C6E] rounded-full text-base"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
