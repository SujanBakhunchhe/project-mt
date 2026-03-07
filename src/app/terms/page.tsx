export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
      
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Return & Refund Policy</h2>
          <p className="mb-2"><strong>7-Day Return Policy:</strong></p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Products can be returned within 7 days of delivery</li>
            <li>Items must be unused, in original packaging with tags</li>
            <li>Refund will be processed within 7-10 business days</li>
            <li>Customer bears return shipping cost unless product is defective</li>
          </ul>
          
          <p className="mt-4 mb-2"><strong>Non-Returnable Items:</strong></p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Electrical items once installed</li>
            <li>Custom-ordered parts</li>
            <li>Items damaged due to misuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. Shipping & Delivery</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Free shipping on orders above NPR 3,000</li>
            <li>Delivery within 3-7 business days across Nepal</li>
            <li>Tracking information provided via email</li>
            <li>Cash on Delivery (COD) available</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. Product Warranty</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>All products come with manufacturer warranty</li>
            <li>Warranty period varies by product (check product description)</li>
            <li>Warranty void if product tampered or misused</li>
            <li>Contact us for warranty claims with purchase receipt</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Payment Terms</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>We accept eSewa and Cash on Delivery</li>
            <li>All prices in Nepali Rupees (NPR)</li>
            <li>Prices subject to change without notice</li>
            <li>Payment must be completed to confirm order</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. User Responsibilities</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Provide accurate delivery information</li>
            <li>Inspect products upon delivery</li>
            <li>Report defects within 24 hours of delivery</li>
            <li>Maintain account security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
          <p>
            BikeParts Nepal is not liable for any indirect, incidental, or consequential damages 
            arising from product use. Our liability is limited to the purchase price of the product.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of Nepal. Any disputes shall be resolved in 
            Kathmandu jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">8. Contact Information</h2>
          <p>For questions about these terms:</p>
          <ul className="list-none ml-0 mt-2 space-y-1">
            <li>📧 Email: support@bikepartsnepal.com</li>
            <li>📱 Phone: +977 9845170950</li>
            <li>📍 Address: Kathmandu, Nepal</li>
          </ul>
        </section>

        <p className="text-sm text-white/60 mt-8 pt-6 border-t border-white/20">
          Last Updated: March 7, 2026
        </p>
      </div>
    </div>
  );
}
