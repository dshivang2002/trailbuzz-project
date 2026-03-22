import { Shield, Award, Users, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const AboutPage = () => {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '10000+', label: 'Happy Travelers' },
    { number: '500+', label: 'Tours Completed' },
    { number: '50+', label: 'Destinations Covered' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. All our tours are conducted with strict safety protocols and experienced guides.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from planning to execution, ensuring memorable experiences.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We listen, adapt, and deliver personalized travel solutions.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about travel and sharing the incredible beauty and culture of India with the world.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      bio: '15+ years experience in travel industry'
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Head',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      bio: 'Expert in tour planning and logistics'
    },
    {
      name: 'Amit Patel',
      role: 'Customer Relations',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
      bio: 'Ensuring exceptional customer experiences'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="about-page">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481340101608-cb5f45cb1f99)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C6E]/90 to-[#1A3C6E]/70"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <Breadcrumbs items={[{ name: 'About Us', path: '/about' }]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] text-white mb-4">
            About Yatrika
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Creating unforgettable travel experiences across India since 2010
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">OUR STORY</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3 mb-6">
              Journey Beyond Limits
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6 text-[#475569] leading-relaxed">
            <p>
              Yatrika was born from a simple yet profound belief: travel has the power to transform lives. 
              Founded in 2010 by a group of passionate travel enthusiasts, we started with a vision to make 
              the diverse beauty of India accessible to everyone.
            </p>
            
            <p>
              Over the past 15 years, we've grown from a small team of 3 to a family of 50+ dedicated professionals, 
              serving over 10,000 happy travelers. But our core mission remains unchanged – to create authentic, 
              memorable, and safe travel experiences that connect people with the incredible heritage, culture, 
              and natural beauty of India.
            </p>
            
            <p>
              From the snow-capped peaks of the Himalayas to the golden deserts of Rajasthan, from the spiritual 
              ghats of Varanasi to the serene backwaters of Kerala, we've crafted journeys that go beyond 
              sightseeing. We believe in responsible tourism, supporting local communities, and preserving 
              the environment for future generations.
            </p>
            
            <p>
              What sets us apart is our attention to detail, local expertise, and genuine care for our travelers. 
              Every itinerary is thoughtfully designed, every guide is expertly trained, and every moment is 
              crafted to ensure you return home with memories that last a lifetime.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="p-8 text-center border-[#1A3C6E]/10 hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-black font-['Poppins'] text-[#F97316] mb-2">
                {stat.number}
              </div>
              <div className="text-[#475569] font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center border-[#1A3C6E]/10 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316]/10 rounded-full mb-4">
                    <Icon size={32} className="text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3C6E] mb-3">{value.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-black font-['Poppins'] text-[#1A3C6E] mt-3">
              Meet The People Behind Yatrika
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border-[#1A3C6E]/10 hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-[#1A3C6E] mb-1">{member.name}</h3>
                  <p className="text-[#F97316] font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-[#475569]">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-[#1A3C6E] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-black font-['Poppins'] mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Let us help you create your perfect travel experience. Contact us today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full px-8"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#1A3C6E] rounded-full px-8"
            >
              <Link to="/tour-packages">View Packages</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
