"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link href="/admin" className="text-white/70 hover:text-white">Dashboard</Link>
          <Link href="/admin/products" className="text-white/70 hover:text-white">Products</Link>
          <Link href="/admin/orders" className="text-white/70 hover:text-white">Orders</Link>
          <Link href="/" className="text-white/70 hover:text-white">← Back to Site</Link>
        </div>
        {children}
      </div>
    </div>
  );
}
