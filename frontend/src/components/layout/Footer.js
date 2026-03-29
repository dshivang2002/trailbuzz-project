import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const LOGO_URL = 'https://customer-assets.emergentagent.com/job_4ce86279-3a36-4bbd-9264-6b6ce64e676c/artifacts/e3m79p4w_TRAILBUZZ_transparent.png';

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A3C6E] text-white mt-24" data-testid="main-footer">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#F97316] font-black text-2xl">TB</span>
              </div>
              <div>
                <div className="text-2xl font-black font-['Poppins'] text-white leading-none">
                  Trailbuzz
                </div>
                <div className="text-xs text-[#F97316] font-medium">Buzz into Adventure</div>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Your trusted partner for unforgettable journeys across India. Experience the beauty and diversity of our incredible country.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F97316] transition-colors"
                data-testid="social-facebook"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F97316] transition-colors"
                data-testid="social-instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F97316] transition-colors"
                data-testid="social-twitter"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-['Poppins']">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-packages">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/our-fleet" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-fleet">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-['Poppins']">Popular Destinations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tour-packages/char-dham-yatra" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-char-dham">
                  Char Dham Yatra
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/shimla-tour" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-shimla">
                  Shimla
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/manali-tour" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-manali">
                  Manali
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/jaipur-tour" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-jaipur">
                  Jaipur
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/rishikesh-tour" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-rishikesh">
                  Rishikesh
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-['Poppins']">Get In Touch</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-white/80 text-sm">1004, Phase 4, Sector 59, Mohali, Punjab 160059</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:9198476606" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-phone">
                  9198476606
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:dshivang208@gmail.com" className="text-white/80 hover:text-[#F97316] transition-colors text-sm" data-testid="footer-email">
                  dshivang208@gmail.com
                </a>
              </li>
            </ul>

            <div>
              <h4 className="font-medium mb-3 text-sm">Subscribe to Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2" data-testid="newsletter-form">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="newsletter-email-input"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F97316]"
                />
                <Button
                  type="submit"
                  data-testid="newsletter-submit-btn"
                  className="bg-[#F97316] hover:bg-[#ea580c] text-white px-4"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Trailbuzz. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-white/60 hover:text-[#F97316] transition-colors" data-testid="footer-privacy">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-white/60 hover:text-[#F97316] transition-colors" data-testid="footer-terms">
                Terms & Conditions
              </Link>
              <Link to="/refund-policy" className="text-white/60 hover:text-[#F97316] transition-colors" data-testid="footer-refund">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
