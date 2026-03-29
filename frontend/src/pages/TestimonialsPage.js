import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API_URL}/testimonials?status=approved`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-[#1A3C6E] text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Testimonials', path: '/testimonials' }]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] mb-4">
            What Our Travelers Say
          </h1>
          <p className="text-xl text-white/80">
            Real experiences from real travelers who chose Trailbuzz
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse"></div>
            ))
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 border-[#1A3C6E]/10 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                
                <div className="relative mb-4">
                  <Quote size={24} className="text-[#F97316] opacity-20 absolute -top-2 -left-2" />
                  <p className="text-[#0F172A] leading-relaxed pl-4">
                    {testimonial.review}
                  </p>
                </div>

                <div className="flex items-center border-t border-gray-100 pt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A3C6E] to-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-[#1A3C6E]">{testimonial.name}</div>
                    <div className="text-sm text-[#475569]">{testimonial.location}</div>
                    <div className="text-xs text-[#F97316]">{testimonial.tour_taken}</div>
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
    </div>
  );
};

export default TestimonialsPage;
