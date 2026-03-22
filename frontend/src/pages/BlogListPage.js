import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BlogListPage = () => {
  const pageName = "BlogListPage".replace('Page', '').replace(/([A-Z])/g, ' ').trim();
  
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">
          {pageName}
        </h1>
        <p className="text-[#475569] mb-8">
          This page is under development. Coming soon!
        </p>
        <Button asChild className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogListPage;
