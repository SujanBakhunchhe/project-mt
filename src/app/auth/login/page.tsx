"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement login logic
    console.log({ email, password });
    setLoading(false);
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-white/80 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/auth/forgot-password" className="text-white/90 hover:text-white underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 backdrop-blur-xl bg-white/10 text-white/80">Or continue with</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full backdrop-blur-xl bg-transparent border-white/30 text-white hover:bg-white/10 py-6 rounded-xl transition-all">
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
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-white hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
