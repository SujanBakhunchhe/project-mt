import Link from "next/link";
import { PrimaryButton, WhiteButton } from "@/components/Buttons";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🏍️ Nepal's #1 Bike Parts Store
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
                Premium Bike Parts for Every Rider
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Quality motorcycle parts and accessories delivered across Nepal. Fast shipping, genuine products, competitive prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/bikes">
                  <PrimaryButton size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                    Browse Bikes →
                  </PrimaryButton>
                </Link>
                <Link href="/parts">
                  <WhiteButton size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                    View All Parts
                  </WhiteButton>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl aspect-square hover:scale-105 transition-transform duration-500">
                <img 
                  src="/r1-bike.jpg" 
                  alt="Yamaha R1 Motorcycle" 
                  className="w-full h-full object-cover animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Us</h2>
              <p className="text-white/70 max-w-2xl mx-auto">We're committed to providing the best experience for motorcycle enthusiasts across Nepal</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  ),
                  title: "Genuine Products",
                  desc: "100% authentic bike parts from trusted manufacturers. Quality guaranteed."
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  title: "Fast Delivery",
                  desc: "Quick shipping across Nepal. Free delivery above NPR 3000."
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  title: "Best Prices",
                  desc: "Competitive pricing with multiple payment options including COD."
                }
              ].map((feature, i) => (
                <div key={i} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bike Brands */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Shop by Bike Brand</h2>
              <p className="text-white/70 max-w-2xl mx-auto">Select your bike brand to find compatible parts</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Honda', logo: '/honda-logo.svg' },
                { name: 'Yamaha', logo: '/yamaha-logo.svg' },
                { name: 'Bajaj', logo: '/bajaj-logo.svg' },
                { name: 'Hero', logo: '/hero-logo.svg' }
              ].map((brand) => (
                <Link key={brand.name} href={`/bikes/${brand.name.toLowerCase()}`}>
                  <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all cursor-pointer group hover:-translate-y-2">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg p-3">
                      <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
                    <p className="text-sm text-white/60">View Parts →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 overflow-hidden">
          <div className="container mx-auto px-4 mb-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Customers Say</h2>
              <p className="text-white/70 max-w-2xl mx-auto">Trusted by thousands of riders across Nepal</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex gap-4 md:gap-6 animate-scroll">
              {[...Array(2)].flatMap(() => [
                { name: 'Rajesh Kumar', location: 'Kathmandu', text: 'Best quality parts at great prices. Fast delivery and excellent customer service!', rating: 5 },
                { name: 'Suman Thapa', location: 'Pokhara', text: 'Found exactly what I needed for my Pulsar. Genuine parts, highly recommended!', rating: 5 },
                { name: 'Bikash Shrestha', location: 'Lalitpur', text: 'Amazing experience! The parts arrived quickly and fit perfectly.', rating: 5 },
                { name: 'Anil Gurung', location: 'Butwal', text: 'Reliable service and authentic products. Will definitely order again.', rating: 5 },
                { name: 'Prakash Rai', location: 'Biratnagar', text: 'Great selection of parts for all bike models. Very satisfied!', rating: 5 },
                { name: 'Deepak Tamang', location: 'Dharan', text: 'Professional service and quality products. Best in Nepal!', rating: 5 },
              ]).map((review, i) => (
                <div key={i} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 md:p-6 w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex-shrink-0 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/80 mb-4 text-sm md:text-base line-clamp-4">{review.text}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">{review.name}</p>
                      <p className="text-white/60 text-xs md:text-sm">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
