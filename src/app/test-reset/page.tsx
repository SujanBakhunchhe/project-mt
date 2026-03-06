"use client";

import { useState } from "react";

export default function TestResetPage() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const getResetLink = async () => {
    setLoading(true);
    try {
      // Request reset
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Get the token
      const res = await fetch(`/api/dev/get-reset-token?email=${email}`);
      const data = await res.json();
      
      if (data.resetUrl) {
        setResetLink(data.resetUrl);
      } else {
        alert("No reset token found. Make sure the email exists.");
      }
    } catch (error) {
      alert("Error getting reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Get Reset Link (DEV ONLY)</h1>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
          />
          
          <button
            onClick={getResetLink}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            {loading ? "Getting Link..." : "Get Reset Link"}
          </button>

          {resetLink && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
              <p className="text-white font-bold mb-2">Reset Link:</p>
              <a href={resetLink} className="text-blue-300 break-all hover:underline">
                {resetLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
