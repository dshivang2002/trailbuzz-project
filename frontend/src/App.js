import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Lenis from 'lenis';
import '@/App.css';

import { AuthProvider } from '@/context/AuthContext';
import { BookingProvider } from '@/context/BookingContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

// Pages
import HomePage from '@/pages/HomePage';
import PackagesPage from '@/pages/PackagesPage';
import PackageDetailPage from '@/pages/PackageDetailPage';
import BookingPage from '@/pages/BookingPage';
import BlogListPage from '@/pages/BlogListPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import AboutPage from '@/pages/AboutPage';
import OurFleetPage from '@/pages/OurFleetPage';
import ContactPage from '@/pages/ContactPage';
import GalleryPage from '@/pages/GalleryPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import RefundPolicyPage from '@/pages/RefundPolicyPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Destination Pages
import UttarakhandPage from '@/pages/destinations/UttarakhandPage';
import HimachalPage from '@/pages/destinations/HimachalPage';
import RajasthanPage from '@/pages/destinations/RajasthanPage';
import UttarPradeshPage from '@/pages/destinations/UttarPradeshPage';

// City Pages
import CharDhamPage from '@/pages/cities/CharDhamPage';
import HaridwarPage from '@/pages/cities/HaridwarPage';
import RishikeshPage from '@/pages/cities/RishikeshPage';
import ShimlaPage from '@/pages/cities/ShimlaPage';
import ManaliPage from '@/pages/cities/ManaliPage';
import JaipurPage from '@/pages/cities/JaipurPage';

// Admin Pages
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManagePackages from '@/pages/admin/ManagePackages';
import ManageBookings from '@/pages/admin/ManageBookings';
import ManageBlogs from '@/pages/admin/ManageBlogs';
import ManageVehicles from '@/pages/admin/ManageVehicles';
import ManageTestimonials from '@/pages/admin/ManageTestimonials';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/tour-packages" element={<PackagesPage />} />
                <Route path="/tour-packages/:slug" element={<PackageDetailPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/our-fleet" element={<OurFleetPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />

                {/* Destination Pages */}
                <Route path="/destinations/uttarakhand" element={<UttarakhandPage />} />
                <Route path="/destinations/himachal-pradesh" element={<HimachalPage />} />
                <Route path="/destinations/rajasthan" element={<RajasthanPage />} />
                <Route path="/destinations/uttar-pradesh" element={<UttarPradeshPage />} />

                {/* City Pages */}
                <Route path="/tours/char-dham-yatra" element={<CharDhamPage />} />
                <Route path="/tours/haridwar-tour" element={<HaridwarPage />} />
                <Route path="/tours/rishikesh-tour" element={<RishikeshPage />} />
                <Route path="/tours/shimla-tour" element={<ShimlaPage />} />
                <Route path="/tours/manali-tour" element={<ManaliPage />} />
                <Route path="/tours/jaipur-tour" element={<JaipurPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/packages" element={<ManagePackages />} />
                <Route path="/admin/bookings" element={<ManageBookings />} />
                <Route path="/admin/blogs" element={<ManageBlogs />} />
                <Route path="/admin/vehicles" element={<ManageVehicles />} />
                <Route path="/admin/testimonials" element={<ManageTestimonials />} />
                <Route path="/admin/settings" element={<AdminSettings />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFAB />
            <MobileBottomNav />
            <Toaster position="top-right" richColors />
          </div>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
