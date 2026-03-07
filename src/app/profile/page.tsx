"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { PrimaryButton, WhiteButton, OutlineButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ToastProvider";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            image: data.image || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile");
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders");
      }
    };

    if (session?.user) {
      fetchProfile();
      fetchOrders();
    }
  }, [session]);

  const handleSave = async () => {
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error, "error");
        setLoading(false);
        return;
      }

      showToast("Profile updated successfully!", "success");
      setIsEditing(false);
      await update();
    } catch (error) {
      showToast("Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setErrors({});
    setLoading(true);

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        setLoading(false);
        return;
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error, "error");
        setLoading(false);
        return;
      }

      showToast("Password changed successfully!", "success");
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      showToast("Failed to change password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {profile.name ? profile.name[0].toUpperCase() : "U"}
              </div>
              <h2 className="text-2xl font-bold text-white">{profile.name || "User"}</h2>
              <p className="text-white/60">{profile.email || "Loading..."}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-sm">Phone</Label>
                <p className="text-white">{profile.phone || "Not set"}</p>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Address</Label>
                <p className="text-white">{profile.address || "Not set"}</p>
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
                  <Label className="text-white">Profile Picture</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {profile.image ? (
                      <Image src={profile.image} alt="Profile" width={80} height={80} className="rounded-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {profile.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    <CldUploadWidget
                      uploadPreset="bikeparts"
                      onSuccess={(result: any) => {
                        setProfile({...profile, image: result.info.secure_url});
                        showToast("Image uploaded!", "success");
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                          Upload Photo
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
                <div>
                  <Label className="text-white">Name</Label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label className="text-white">Email</Label>
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label className="text-white">Phone</Label>
                  <Input 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    placeholder="+977 9812345678"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Address</Label>
                  <Input 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    placeholder="Kathmandu, Nepal"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <PrimaryButton 
                  onClick={handleSave}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <>
              {/* Order History */}
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <p className="text-white/70 text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="text-white font-bold text-lg">{order.orderNumber}</p>
                            <p className="text-white/60 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
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
                              <Link href={`/order/${order.orderNumber}`}>View</Link>
                            </WhiteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <WhiteButton onClick={() => setShowPasswordModal(true)} className="py-6">
                    Change Password
                  </WhiteButton>
                  <WhiteButton className="py-6">
                    Saved Addresses
                  </WhiteButton>
                  <WhiteButton className="py-6">
                    Wishlist
                  </WhiteButton>
                  <OutlineButton className="border-red-500/50 text-red-400 hover:bg-red-500/10 py-6">
                    Logout
                  </OutlineButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Current Password</Label>
                <Input 
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">New Password</Label>
                <Input 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Confirm New Password</Label>
                <Input 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
                {errors.confirmPassword && <p className="text-red-300 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
              <div className="flex gap-3 pt-4">
                <WhiteButton 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    setErrors({});
                  }}
                  className="flex-1"
                >
                  Cancel
                </WhiteButton>
                <PrimaryButton 
                  onClick={handlePasswordChange}
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? "Changing..." : "Change Password"}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
