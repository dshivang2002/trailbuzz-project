import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Calendar, Phone } from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Package, label: 'Packages', path: '/tour-packages' },
    { icon: Calendar, label: 'Book', path: '/booking' },
    { icon: Phone, label: 'Contact', path: '/contact' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 mobile-bottom-nav" data-testid="mobile-bottom-nav">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`mobile-bottom-nav-${item.label.toLowerCase()}`}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive ? 'text-[#1A3C6E]' : 'text-[#64748B]'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs ${ isActive ? 'font-semibold' : 'font-medium' }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
