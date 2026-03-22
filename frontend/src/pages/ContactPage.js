import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/inquiries`, formData);
      toast.success('Thank you! We will get back to you within 2 hours.');
      setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
    } catch (error) {
      console.error('Failed to submit inquiry', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['1004, Phase 4, Sector 59', 'Mohali, Punjab 160059']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 9198476606', 'Mon-Sun: 9:00 AM - 8:00 PM']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['dshivang208@gmail.com', 'Response within 2 hours']
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Saturday: 9:00 AM - 7:00 PM', 'Sunday: 10:00 AM - 5:00 PM']
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="contact-page">
      {/* Hero */}
      <div className="bg-[#1A3C6E] text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Contact Us', path: '/contact' }]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Have questions? We'd love to hear from you. Send us a message and we'll respond within 2 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-[#1A3C6E]/10">
              <h2 className="text-2xl font-bold text-[#1A3C6E] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="contact-name-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      data-testid="contact-phone-input"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="contact-email-input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination">Interested Destination</Label>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      data-testid="contact-destination-input"
                      placeholder="e.g., Shimla, Manali"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    data-testid="contact-message-input"
                    placeholder="Tell us about your travel plans, preferences, or any questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                  className="w-full md:w-auto bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full px-8"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="p-6 border-[#1A3C6E]/10">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F97316]/10 rounded-full">
                        <Icon size={24} className="text-[#F97316]" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-[#1A3C6E] mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-[#475569] text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Social Media */}
            <Card className="p-6 border-[#1A3C6E]/10">
              <h3 className="text-lg font-semibold text-[#1A3C6E] mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#F97316]/10 rounded-full flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  F
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#F97316]/10 rounded-full flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  I
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#F97316]/10 rounded-full flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  T
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1A3C6E] mb-6 text-center">Find Us On Map</h2>
          <div className="rounded-2xl overflow-hidden border border-[#1A3C6E]/10 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.7805881841435!2d76.72840931511884!3d30.69686948163911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee167e3e8c5f%3A0x6b4a8a6f9f9f9f9f!2sSector%2059%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20160059!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yatrika Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
