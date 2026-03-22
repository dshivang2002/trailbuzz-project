import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-[#475569] py-4" data-testid="breadcrumbs">
      <Link to="/" className="hover:text-[#1A3C6E] transition-colors flex items-center">
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={16} />
          {index === items.length - 1 ? (
            <span className="text-[#1A3C6E] font-medium">{item.name}</span>
          ) : (
            <Link to={item.path} className="hover:text-[#1A3C6E] transition-colors">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
