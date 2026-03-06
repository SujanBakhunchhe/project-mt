"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function SessionManager() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    // Check if this is a new browser session
    const isNewSession = !sessionStorage.getItem("sessionActive");
    
    if (isNewSession) {
      // New browser session - check if remember me was set
      const rememberMe = localStorage.getItem("rememberMe");
      
      if (rememberMe !== "true") {
        // Remember me not checked - logout
        signOut({ redirect: false });
        return;
      }
      
      // Mark session as active
      sessionStorage.setItem("sessionActive", "true");
    }
  }, [session]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Session storage will be cleared when browser closes
    };
  }, []);

  return null;
}
