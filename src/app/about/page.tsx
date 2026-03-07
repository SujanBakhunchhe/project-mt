import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">About BikeParts Nepal</h1>
              <p className="text-xl text-white/80">
                Your trusted partner for premium motorcycle parts across Nepal since 2020
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8">
                <h2 className="text-4xl font-bold mb-6 text-white">Our Story</h2>
                <p className="text-white/70 mb-4 text-lg leading-relaxed">
                  Founded in 2020, BikeParts Nepal started with a simple mission: to make quality motorcycle parts accessible to every rider in Nepal.
                </p>
                <p className="text-white/70 mb-4 text-lg leading-relaxed">
                  We understand the challenges riders face when searching for genuine parts. That's why we've built a platform that connects you directly with authentic, high-quality motorcycle components.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  Today, we serve thousands of satisfied customers across Nepal, from Kathmandu to the remotest corners of the country.
                </p>
              </div>
              
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-12 flex items-center justify-center">
                <div className="text-9xl">🏍️</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '5000+', label: 'Happy Customers' },
                { value: '1000+', label: 'Products' },
                { value: '50+', label: 'Bike Models' },
                { value: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <div key={i} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                  title: 'Authenticity',
                  desc: 'We guarantee 100% genuine parts from authorized manufacturers. No compromises on quality.'
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                  title: 'Speed',
                  desc: 'Fast processing and delivery. We know you need your parts quickly to get back on the road.'
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
                  title: 'Customer First',
                  desc: "Your satisfaction is our priority. We're here to help you find exactly what you need."
                }
              ].map((value, i) => (
                <div key={i} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-white/70">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to Find Your Parts?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied riders who trust BikeParts Nepal for their motorcycle needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bikes">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-xl">
                    Browse Bikes
                  </Button>
                </Link>
                <Link href="/parts">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl font-semibold">
                    View All Parts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
