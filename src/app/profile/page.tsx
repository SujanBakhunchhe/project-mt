"use client";

import { useState } from "react";
import { PrimaryButton, WhiteButton, OutlineButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+977 9841234567",
    address: "Kathmandu, Nepal",
  });

  const orders = [
    { id: "ORD-001", date: "2026-03-01", total: 2100, status: "Delivered" },
    { id: "ORD-002", date: "2026-02-25", total: 1200, status: "Shipped" },
    { id: "ORD-003", date: "2026-02-20", total: 450, status: "Processing" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {profile.name[0]}
              </div>
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-white/60">{profile.email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-sm">Phone</Label>
                <p className="text-white">{profile.phone}</p>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Address</Label>
                <p className="text-white">{profile.address}</p>
              </div>
            </div>

            <WhiteButton 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full mt-6"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </WhiteButton>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Name</Label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Email</Label>
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Phone</Label>
                  <Input 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Address</Label>
                  <Input 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <WhiteButton 
                  onClick={() => setIsEditing(false)}
                  className="w-full"
                >
                  Save Changes
                </WhiteButton>
              </div>
            </div>
          ) : (
            <>
              {/* Order History */}
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-white font-bold text-lg">{order.id}</p>
                          <p className="text-white/60 text-sm">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-white font-bold">NPR {order.total}</p>
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <WhiteButton size="sm">
                            View
                          </WhiteButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <WhiteButton className="py-6">
                    Change Password
                  </WhiteButton>
                  <WhiteButton className="py-6">
                    Saved Addresses
                  </WhiteButton>
                  <WhiteButton className="py-6">
                    Wishlist
                  </WhiteButton>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 py-6">
                    Logout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
