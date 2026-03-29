import { Breadcrumbs } from '@/components/Breadcrumbs';

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Refund Policy', path: '/refund-policy' }]} />
          <h1 className="text-4xl font-black font-['Poppins']">Refund Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-[#475569]">Last Updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">1. Cancellation & Refund Timeline</h2>
            <div className="bg-white p-6 rounded-xl border border-[#1A3C6E]/10">
              <ul className="space-y-3 text-[#475569]">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">30+ days:</span>
                  <span>90% refund (10% processing fee)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">15-29 days:</span>
                  <span>75% refund (25% cancellation charges)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">7-14 days:</span>
                  <span>50% refund (50% cancellation charges)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Within 7 days:</span>
                  <span>No refund applicable</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">2. Refund Processing</h2>
            <p className="text-[#475569]">
              Refunds will be processed within 7-10 business days from the date of cancellation approval.
              The refund will be credited to the original payment method used during booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">3. Non-Refundable Components</h2>
            <p className="text-[#475569] mb-3">The following charges are non-refundable:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#475569]">
              <li>Advance paid to third-party service providers (hotels, transportation)</li>
              <li>Booking processing fees</li>
              <li>Travel insurance premiums</li>
              <li>Special permits and entry fees</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">4. Force Majeure</h2>
            <p className="text-[#475569]">
              In case of tour cancellation by Trailbuzz due to unforeseen circumstances (natural disasters, political
              unrest, pandemic, etc.), we will offer a full refund or credit voucher valid for 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">5. Partial Cancellations</h2>
            <p className="text-[#475569]">
              If you wish to cancel services for some travelers while others continue, refund will be calculated
              pro-rata based on the applicable cancellation charges and any additional costs incurred.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">6. Modification Charges</h2>
            <p className="text-[#475569]">
              Changes to travel dates, destinations, or traveler details may incur modification charges of
              ₹500-₹2000 depending on the extent of changes and advance notice provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">7. Refund for Service Failures</h2>
            <p className="text-[#475569]">
              If we fail to deliver promised services due to reasons within our control, we will provide appropriate
              compensation or refund as deemed reasonable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">8. How to Request a Refund</h2>
            <p className="text-[#475569]">
              To request a refund, please email us at dshivang208@gmail.com with your booking ID and reason for
              cancellation. Our team will process your request within 48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
