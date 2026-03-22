import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatCurrency } from '@/lib/utils';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const UttarakhandPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages?state=Uttarakhand`);
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages', error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: 'What is the best time to visit Uttarakhand?',
      answer: 'The best time to visit Uttarakhand depends on what you want to experience. For hill stations like Nainital and Mussoorie, April to June and September to November are ideal. For Char Dham Yatra, May to October is the best period. Winter months (December to February) are perfect for snow lovers.'
    },
    {
      question: 'How do I reach Uttarakhand?',
      answer: 'Uttarakhand is well-connected by air, rail, and road. The nearest airports are Jolly Grant Airport in Dehradun and Pantnagar Airport. Major railway stations include Haridwar, Dehradun, and Kathgodam. Regular bus services operate from Delhi, Chandigarh, and other nearby cities.'
    },
    {
      question: 'Is Char Dham Yatra safe?',
      answer: 'Yes, Char Dham Yatra is generally safe. We provide experienced guides, comfortable accommodation, and well-maintained vehicles. However, it involves travel in hilly terrain, so elderly and those with health conditions should consult their doctor before planning.'
    },
    {
      question: 'What should I pack for Uttarakhand trip?',
      answer: 'Pack comfortable walking shoes, warm clothing (even in summer for higher altitudes), sunscreen, sunglasses, first-aid kit, and any personal medications. For Char Dham, carry woolen clothes, raincoat, and trekking shoes.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6808521/pexels-photo-6808521.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C6E]/90 to-[#1A3C6E]/60"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <Breadcrumbs items={[
            { name: 'Destinations', path: '/tour-packages' },
            { name: 'Uttarakhand', path: '/destinations/uttarakhand' }
          ]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] text-white mb-4">
            Uttarakhand Tour Packages
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Experience the divine land of Gods - From Char Dham to adventure sports
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* About Uttarakhand */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] mb-6">
            About Uttarakhand Tourism
          </h2>
          
          <div className="prose prose-lg max-w-none space-y-4 text-[#475569] leading-relaxed">
            <p>
              Uttarakhand, often called the "Land of Gods" (Devbhoomi), is a pristine state nestled in the Himalayan ranges
              of northern India. Known for its spiritual significance, breathtaking landscapes, and adventure opportunities,
              Uttarakhand attracts millions of tourists every year seeking both divine blessings and natural beauty.
            </p>
            
            <p>
              The state is home to the sacred Char Dham pilgrimage circuit - Yamunotri, Gangotri, Kedarnath, and Badrinath -
              which holds immense religious importance for Hindus. Beyond spirituality, Uttarakhand offers spectacular hill
              stations like Nainital, Mussoorie, and Ranikhet, along with wildlife sanctuaries such as Jim Corbett National Park
              and Valley of Flowers.
            </p>
            
            <p>
              Adventure enthusiasts find their paradise in Uttarakhand with opportunities for trekking, river rafting in Rishikesh,
              skiing in Auli, and camping in numerous scenic locations. The Ganga Aarti at Haridwar and Rishikesh's yoga capital
              status make it a spiritual hub for seekers from around the world.
            </p>
            
            <p>
              From snow-capped peaks to lush valleys, from ancient temples to modern adventure sports, Uttarakhand offers a perfect
              blend of spirituality, adventure, and natural beauty. Whether you're seeking inner peace, adrenaline rush, or simply
              want to immerse yourself in nature's grandeur, Uttarakhand has something magical for everyone.
            </p>
          </div>
        </div>

        {/* Key Attractions */}
        <div className="mb-16">
          <h2 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] mb-8 text-center">
            Must-Visit Places in Uttarakhand
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Char Dham', desc: 'Sacred pilgrimage circuit', link: '/tours/char-dham-yatra' },
              { name: 'Rishikesh', desc: 'Yoga capital & adventure hub', link: '/tours/rishikesh-tour' },
              { name: 'Haridwar', desc: 'Holy city on Ganges', link: '/tours/haridwar-tour' },
              { name: 'Nainital', desc: 'Beautiful lake city', link: '/tour-packages' },
              { name: 'Mussoorie', desc: 'Queen of Hills', link: '/tour-packages' },
              { name: 'Jim Corbett', desc: 'Wildlife sanctuary', link: '/tour-packages' }
            ].map((place, index) => (
              <Card key={index} className="p-6 text-center border-[#1A3C6E]/10 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-[#1A3C6E] mb-2">{place.name}</h3>
                <p className="text-[#475569] mb-4">{place.desc}</p>
                <Button asChild size="sm" variant="outline">
                  <Link to={place.link}>Explore</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] mb-8 text-center">
            Uttarakhand Tour Packages
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
              ))
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/tour-packages/${pkg.slug}`}
                  className="package-card bg-white rounded-xl overflow-hidden border border-[#1A3C6E]/10 hover:shadow-xl transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={pkg.featured_image || pkg.images[0]}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#1A3C6E] mb-2">{pkg.name}</h3>
                    <p className="text-sm text-[#475569] mb-4">{pkg.duration_days}D / {pkg.duration_nights}N</p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-[#1A3C6E]">{formatCurrency(pkg.price_per_person)}</div>
                      <Button className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-[#475569]">No packages available for Uttarakhand at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Best Time to Visit */}
        <div className="bg-white rounded-2xl p-12 border border-[#1A3C6E]/10 mb-16">
          <h2 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] mb-6 text-center">
            Best Time to Visit Uttarakhand
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#F97316] mb-3">Summer (Mar-Jun)</h3>
              <p className="text-[#475569]">
                Perfect for hill stations and sightseeing. Temperature: 15-30°C. Best for families and honeymooners.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#F97316] mb-3">Monsoon (Jul-Sep)</h3>
              <p className="text-[#475569]">
                Lush green valleys, ideal for nature lovers. Char Dham opens in this season. Carry rainwear.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#F97316] mb-3">Winter (Oct-Feb)</h3>
              <p className="text-[#475569]">
                Snowfall in higher altitudes. Perfect for snow activities. Temperature: 0-15°C. Warm clothes essential.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black font-['Poppins'] text-[#1A3C6E] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-[#1A3C6E]/10 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-[#F97316]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#475569]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default UttarakhandPage;
