export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
          <p className="mb-2"><strong>Personal Information:</strong></p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Name, email address, phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment information (processed securely via eSewa)</li>
            <li>Order history and preferences</li>
          </ul>
          
          <p className="mt-4 mb-2"><strong>Automatically Collected:</strong></p>
          <ul className="list-disc ml-6 space-y-2">
            <li>IP address and browser information</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent</li>
            <li>Cookies for site functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to customer service requests</li>
            <li>Improve our website and services</li>
            <li>Send promotional emails (with your consent)</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. Information Sharing</h2>
          <p className="mb-2">We do NOT sell your personal information. We may share data with:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Payment Processors:</strong> eSewa for payment processing</li>
            <li><strong>Shipping Partners:</strong> For order delivery</li>
            <li><strong>Service Providers:</strong> Email services, hosting providers</li>
            <li><strong>Legal Requirements:</strong> When required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Data Security</h2>
          <p>We implement security measures to protect your information:</p>
          <ul className="list-disc ml-6 space-y-2 mt-2">
            <li>SSL encryption for data transmission</li>
            <li>Secure password hashing</li>
            <li>Regular security audits</li>
            <li>Limited employee access to personal data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. Cookies</h2>
          <p>
            We use cookies to enhance your experience. Cookies help us remember your preferences, 
            keep you logged in, and analyze site traffic. You can disable cookies in your browser 
            settings, but some features may not work properly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your account</li>
            <li>Opt-out of marketing emails</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for their 
            privacy practices. Please review their privacy policies before providing any information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 16. We do not knowingly collect 
            information from children. If you believe we have collected data from a child, 
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">9. Changes to Privacy Policy</h2>
          <p>
            We may update this policy periodically. Changes will be posted on this page with 
            an updated date. Continued use of our services constitutes acceptance of changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">10. Contact Us</h2>
          <p>For privacy-related questions or to exercise your rights:</p>
          <ul className="list-none ml-0 mt-2 space-y-1">
            <li>📧 Email: privacy@bikepartsnepal.com</li>
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
