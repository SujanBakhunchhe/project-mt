import Link from "next/link";

export function Footer() {
  return (
    <footer className="backdrop-blur-2xl bg-slate-900/80 border-t border-white/20 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-sm md:text-base">BikeParts Nepal</span>
            </div>
            <p className="text-white/70 text-xs md:text-sm">Your trusted source for quality motorcycle parts in Nepal.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Shop</h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/70">
              <li><Link href="/bikes" className="hover:text-white transition-colors">All Bikes</Link></li>
              <li><Link href="/parts" className="hover:text-white transition-colors">All Parts</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Return Request</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/terms#return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-white/70">
          <p>&copy; 2026 BikeParts Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
