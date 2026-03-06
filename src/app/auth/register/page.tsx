"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.error || "Registration failed" });
        return;
      }

      // Auto login after registration
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: "Registration successful but login failed. Please login manually." });
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        // Mark session as active and set remember me
        sessionStorage.setItem("sessionActive", "true");
        localStorage.setItem("rememberMe", "true"); // Auto remember on registration
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <Card className="w-full max-w-md relative backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        <div className="p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Create Account
            </h1>
            <p className="text-white/80 mt-2">Join BikeParts Nepal today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: undefined });
                }}
                className={`backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: undefined });
                }}
                className={`backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
                className={`backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: undefined });
                }}
                className={`backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="text-red-300 text-sm">{errors.confirmPassword}</p>}
            </div>

            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl">
                {errors.general}
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 backdrop-blur-xl bg-white/10 text-white/80">Or continue with</span>
              </div>
            </div>

            <Button type="button" onClick={handleGoogleSignIn} variant="outline" className="w-full backdrop-blur-xl bg-transparent border-white/30 text-white hover:bg-white/10 py-6 rounded-xl transition-all">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
          </form>

          <p className="text-center text-sm text-white/80 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
