"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Contact Us</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Name</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Email</Label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
                placeholder="+977 9841234567"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Subject</Label>
              <Input
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Message</Label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500 min-h-[150px]"
                placeholder="Your message..."
              />
            </div>
            <PrimaryButton type="submit" className="w-full">
              Send Message
            </PrimaryButton>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-white/70">+977 9841234567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-white/70">support@bikepartsnepal.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Address</h3>
                  <p className="text-white/70">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Business Hours</h2>
            <div className="space-y-2 text-white/70">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
