import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ManageTestimonials = () => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">
          Admin: ManageTestimonials
        </h1>
        <p className="text-[#475569] mb-8">
          Admin panel is under development. Coming soon!
        </p>
        <Button asChild className="bg-[#1A3C6E] hover:bg-[#142d54] text-white rounded-full">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ManageTestimonials;
