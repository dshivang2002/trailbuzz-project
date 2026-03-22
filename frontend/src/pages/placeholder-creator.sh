#!/bin/bash

# Create placeholder pages
cd /app/frontend/src/pages

# Simple pages
for page in BlogListPage BlogDetailPage AboutPage OurFleetPage ContactPage GalleryPage TestimonialsPage PrivacyPolicyPage TermsPage RefundPolicyPage NotFoundPage; do
  cat > ${page}.js << PAGEEOF
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ${page} = () => {
  const pageName = "${page}".replace('Page', '').replace(/([A-Z])/g, ' $1').trim();
  
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

export default ${page};
PAGEEOF
done

# Destination pages
cd destinations
for page in UttarakhandPage HimachalPage RajasthanPage UttarPradeshPage; do
  cat > ${page}.js << PAGEEOF
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ${page} = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">
          ${page}
        </h1>
        <p className="text-[#475569] mb-8">
          Coming soon!
        </p>
        <Button asChild className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full">
          <Link to="/tour-packages">View All Packages</Link>
        </Button>
      </div>
    </div>
  );
};

export default ${page};
PAGEEOF
done

# City pages
cd ../cities
for page in CharDhamPage HaridwarPage RishikeshPage ShimlaPage ManaliPage JaipurPage; do
  cat > ${page}.js << PAGEEOF
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ${page} = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">
          ${page}
        </h1>
        <p className="text-[#475569] mb-8">
          Coming soon!
        </p>
        <Button asChild className="bg-[#F97316] hover:bg-[#ea580c] text-white rounded-full">
          <Link to="/tour-packages">View All Packages</Link>
        </Button>
      </div>
    </div>
  );
};

export default ${page};
PAGEEOF
done

# Admin pages
cd ../admin
for page in AdminLoginPage AdminDashboard ManagePackages ManageBookings ManageBlogs ManageVehicles ManageTestimonials AdminSettings; do
  cat > ${page}.js << PAGEEOF
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ${page} = () => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-black font-['Poppins'] text-[#1A3C6E] mb-4">
          Admin: ${page}
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

export default ${page};
PAGEEOF
done

echo "All placeholder pages created!"
