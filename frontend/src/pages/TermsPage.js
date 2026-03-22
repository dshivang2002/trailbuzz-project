import { Breadcrumbs } from '@/components/Breadcrumbs';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Terms & Conditions', path: '/terms-and-conditions' }]} />
          <h1 className="text-4xl font-black font-['Poppins']">Terms & Conditions</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-[#475569]">Effective Date: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">1. Booking & Payment Terms</h2>
            <p className="text-[#475569] mb-3">
              By booking a tour with Yatrika, you agree to pay the specified amount as per the booking confirmation.
              A minimum advance of 25% of the total package cost is required to confirm your booking. The remaining
              balance must be paid before the commencement of the tour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">2. Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#475569]">
              <li>Cancellation 30+ days before travel: 10% cancellation charges</li>
              <li>Cancellation 15-29 days before travel: 25% cancellation charges</li>
              <li>Cancellation 7-14 days before travel: 50% cancellation charges</li>
              <li>Cancellation within 7 days of travel: No refund</li>
              <li>No-show: No refund</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">3. Travel Documents</h2>
            <p className="text-[#475569]">
              It is your responsibility to ensure you have valid identity proof, medical fitness certificates (if required),
              and any necessary permits for restricted areas. Yatrika is not responsible for any issues arising from
              incomplete or invalid documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">4. Itinerary Changes</h2>
            <p className="text-[#475569]">
              While we make every effort to adhere to the planned itinerary, Yatrika reserves the right to modify the
              itinerary due to unforeseen circumstances such as weather conditions, road blocks, political situations,
              or any other factors beyond our control. No refund will be provided for such changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">5. Health & Safety</h2>
            <p className="text-[#475569]">
              Travelers must inform us of any medical conditions, allergies, or special requirements at the time of booking.
              We recommend appropriate travel insurance covering medical emergencies. Yatrika is not liable for any
              health issues arising during the tour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">6. Liability Limitations</h2>
            <p className="text-[#475569]">
              Yatrika acts only as an agent for hotels, transportation, and other service providers. We are not liable
              for any loss, injury, damage, or delay caused by factors beyond our control. Our liability is limited to
              the amount paid for the tour package.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">7. Code of Conduct</h2>
            <p className="text-[#475569]">
              Travelers are expected to maintain appropriate behavior and respect local customs, cultures, and environment.
              Yatrika reserves the right to terminate services without refund if a traveler's conduct is deemed
              inappropriate or endangers other travelers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A3C6E] mb-4">8. Dispute Resolution</h2>
            <p className="text-[#475569]">
              Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in
              Mohali, Punjab, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
