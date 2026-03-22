import { Breadcrumbs } from '@/components/Breadcrumbs';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />
          <h1 className="text-4xl font-black font-['Poppins']">Privacy Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-[#475569]">Last Updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">1. Information We Collect</h2>
            <p className="text-[#475569]">
              We collect personal information that you provide to us when making a booking, including your name, email address,
              phone number, address, and payment details. We also collect information about your travel preferences and requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">2. How We Use Your Information</h2>
            <p className="text-[#475569] mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#475569]">
              <li>Process and confirm your bookings</li>
              <li>Send you booking confirmations and travel updates</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Send promotional offers (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">3. Data Security</h2>
            <p className="text-[#475569]">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. All payment information is encrypted and processed securely through
              our payment gateway partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">4. Information Sharing</h2>
            <p className="text-[#475569]">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with
              service providers (hotels, transportation providers) only as necessary to fulfill your booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">5. Your Rights</h2>
            <p className="text-[#475569] mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#475569]">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">6. Cookies</h2>
            <p className="text-[#475569]">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">7. Changes to Privacy Policy</h2>
            <p className="text-[#475569]">
              We may update this privacy policy from time to time. We will notify you of any significant changes by
              posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">8. Contact Us</h2>
            <p className="text-[#475569]">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />Email: dshivang208@gmail.com
              <br />Phone: +91 9198476606
              <br />Address: 1004, Phase 4, Sector 59, Mohali, Punjab 160059
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
