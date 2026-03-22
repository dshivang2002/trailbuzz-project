import { useState } from 'react';
import { X } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const images = [
    { url: 'https://images.pexels.com/photos/6808521/pexels-photo-6808521.jpeg', category: 'himalayas', title: 'Himalayan Trek' },
    { url: 'https://images.pexels.com/photos/36135640/pexels-photo-36135640.jpeg', category: 'mountains', title: 'Snow Mountains' },
    { url: 'https://images.pexels.com/photos/36213405/pexels-photo-36213405.jpeg', category: 'heritage', title: 'Rajasthan Palace' },
    { url: 'https://images.pexels.com/photos/570031/pexels-photo-570031.jpeg', category: 'heritage', title: 'Udaipur Palace' },
    { url: 'https://images.unsplash.com/photo-1481340101608-cb5f45cb1f99', category: 'himalayas', title: 'Mountain Peak' },
    { url: 'https://images.unsplash.com/photo-1611875371292-a2bbee7c496b', category: 'nature', title: 'Mountain Valley' },
    { url: 'https://images.unsplash.com/photo-1704537095827-a8ec19452e94', category: 'nature', title: 'White Horse' },
    { url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10', category: 'heritage', title: 'Indian Architecture' }
  ];

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'himalayas', label: 'Himalayas' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'mountains', label: 'Mountains' },
    { value: 'nature', label: 'Nature' }
  ];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-[#1A3C6E] text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Gallery', path: '/gallery' }]} />
          <h1 className="text-4xl md:text-5xl font-black font-['Poppins'] mb-4">
            Travel Gallery
          </h1>
          <p className="text-xl text-white/80">
            Explore the beauty of India through our lens
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map(cat => (
            <Button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              variant={filter === cat.value ? 'default' : 'outline'}
              className={`rounded-full ${
                filter === cat.value 
                  ? 'bg-[#F97316] hover:bg-[#ea580c] text-white' 
                  : 'border-[#1A3C6E]/20 hover:border-[#F97316]'
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#F97316] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
