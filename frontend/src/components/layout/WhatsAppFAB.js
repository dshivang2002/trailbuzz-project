import { MessageCircle } from 'lucide-react';

export const WhatsAppFAB = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '919198476606'; // With country code
    const message = encodeURIComponent('Hi! I\'m interested in booking a tour with Yatrika.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      data-testid="whatsapp-fab"
      className="fixed bottom-6 right-6 z-50 bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-20"></div>
      <MessageCircle size={28} className="relative z-10" />
    </button>
  );
};
