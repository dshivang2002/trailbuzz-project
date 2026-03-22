import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const LOGO_URL = 'https://customer-assets.emergentagent.com/job_4ce86279-3a36-4bbd-9264-6b6ce64e676c/artifacts/e3m79p4w_YATRIKA_transparent.png';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/tour-packages' },
    { name: 'Our Fleet', path: '/our-fleet' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-morphism shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A3C6E]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Logo - Centered on Mobile, Left on Desktop */}
            <Link to="/" className="flex-shrink-0" data-testid="header-logo-link">
              <img
                src={LOGO_URL}
                alt="Yatrika - Journey Beyond Limits"
                className="h-10 lg:h-14 w-auto"
                data-testid="yatrika-logo"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" data-testid="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  className={`text-sm font-medium transition-colors hover:text-[#F97316] ${
                    location.pathname === link.path
                      ? 'text-[#1A3C6E] font-semibold'
                      : 'text-[#475569]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#1A3C6E]">
                <Phone size={18} />
                <span className="text-sm font-medium">9198476606</span>
              </div>
              <Button
                asChild
                data-testid="header-book-now-btn"
                className="rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white px-6"
              >
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>

            {/* Mobile placeholder for balance */}
            <div className="lg:hidden w-10"></div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            data-testid="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-200 shadow-xl"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  className={`text-base font-medium py-2 transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#1A3C6E] font-semibold'
                      : 'text-[#475569]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="tel:9198476606"
                  className="flex items-center space-x-2 text-[#1A3C6E] py-2"
                  data-testid="mobile-phone-link"
                >
                  <Phone size={20} />
                  <span className="font-medium">9198476606</span>
                </a>
                <a
                  href="mailto:dshivang208@gmail.com"
                  className="flex items-center space-x-2 text-[#1A3C6E] py-2"
                  data-testid="mobile-email-link"
                >
                  <Mail size={20} />
                  <span className="font-medium">dshivang208@gmail.com</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};
