"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ToastProvider";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) setToken(tokenParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error, "error");
        return;
      }

      showToast("Password reset successful!", "success");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (error) {
      showToast("Failed to reset password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm relative backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
      <div className="p-6 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Reset Password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-white/90">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="backdrop-blur-xl bg-white/20 border-white/30 text-white"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="backdrop-blur-xl bg-white/20 border-white/30 text-white"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          <Link href="/auth/login" className="hover:underline">Back to Login</Link>
        </p>
      </div>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      <Suspense fallback={
        <Card className="w-full max-w-sm relative backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 text-center">
            <p className="text-white">Loading...</p>
          </div>
        </Card>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
