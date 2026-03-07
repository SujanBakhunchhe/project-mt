"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PrimaryButton, WhiteButton } from "@/components/Buttons";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [upcomingProducts, setUpcomingProducts] = useState([]);
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true").then(r => r.json()).then(setFeaturedProducts);
    fetch("/api/products?upcoming=true").then(r => r.json()).then(setUpcomingProducts);
    fetch("/api/admin/brands").then(r => r.json()).then(data => setBrands(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Nepal's #1 Bike Parts Store
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Premium Bike Parts
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  for Every Rider
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-xl">
                Quality motorcycle parts and accessories delivered across Nepal. Fast shipping, genuine products, competitive prices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/bikes">
                  <button className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Browse Bikes
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </Link>
                <Link href="/parts">
                  <button className="w-full sm:w-auto px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all">
                    View All Parts
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-6">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/60">Products</div>
                </div>
                <div className="h-12 w-px bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold text-white">1000+</div>
                  <div className="text-sm text-white/60">Happy Customers</div>
                </div>
                <div className="h-12 w-px bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-white/60">Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                <img 
                  src="/r1-bike.jpg" 
                  alt="Yamaha R1 Motorcycle" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 backdrop-blur-xl bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float">
                ✓ Genuine Parts
              </div>
              <div className="absolute -bottom-4 -left-4 backdrop-blur-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float" style={{animationDelay: '1s'}}>
                🚚 Free Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Us</h2>
            <p className="text-white/60 max-w-2xl mx-auto">We're committed to providing the best experience for motorcycle enthusiasts across Nepal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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

        {/* Featured Products */}
        <section className="py-20 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Products</h2>
              <p className="text-white/70 text-lg">Top picks for your motorcycle</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0 ? featuredProducts.map((product: any) => (
                <Link key={product.id} href={`/product/${product.id}`} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-6xl">🔧</span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{product.brand}</p>
                  <p className="text-white text-xl font-bold">NPR {product.price}</p>
                </Link>
              )) : (
                <p className="text-white/70 col-span-4 text-center">No featured products yet</p>
              )}
            </div>
            <div className="text-center mt-8">
              <Link href="/parts">
                <WhiteButton>View All Products →</WhiteButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Coming Soon</h2>
              <p className="text-white/70 text-lg">Exciting new products arriving soon</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingProducts.length > 0 ? upcomingProducts.slice(0, 3).map((product: any) => (
                <div key={product.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-6xl">🔧</span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-white/60 text-sm mb-2">{product.brand}</p>
                  <p className="text-white/80 text-sm">Expected: {product.releaseDate || "Soon"}</p>
                </div>
              )) : (
                <p className="text-white/70 col-span-3 text-center">No upcoming products yet</p>
              )}
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
              {brands.length > 0 ? brands.map((brand) => (
                <Link key={brand.id} href={`/bikes/${brand.name.toLowerCase()}`}>
                  <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all cursor-pointer group hover:-translate-y-2">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg p-3">
                      <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
                    <p className="text-sm text-white/60">View Parts →</p>
                  </div>
                </Link>
              )) : (
                <p className="text-white/60 col-span-4 text-center">No brands available yet</p>
              )}
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
