import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[#1A3C6E] mb-4">Page Not Found</h2>
          <p className="text-lg text-[#475569] mb-8">
            Oops! The page you're looking for seems to have wandered off on its own adventure. 
            Don't worry, we can help you find your way back!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[#1A3C6E] hover:bg-[#142d54] text-white rounded-full px-8"
          >
            <Link to="/">
              <Home size={20} className="mr-2" />
              Go to Homepage
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#1A3C6E] text-[#1A3C6E] hover:bg-[#1A3C6E] hover:text-white rounded-full px-8"
          >
            <Link to="/tour-packages">
              <Search size={20} className="mr-2" />
              Browse Packages
            </Link>
          </Button>
        </div>

        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1481340101608-cb5f45cb1f99"
            alt="Mountain landscape"
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
          />
          <p className="text-sm text-[#475569] mt-4">
            While you're here, why not explore our amazing tour packages?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
