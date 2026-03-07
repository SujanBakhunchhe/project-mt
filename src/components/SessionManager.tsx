"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function SessionManager() {
  const { data: session } = useSession();

  useEffect(() => {
    // Clear session storage when logged out
    if (!session) {
      sessionStorage.removeItem("sessionActive");
      return;
    }

    // Check if this is a new browser session
    const isNewSession = !sessionStorage.getItem("sessionActive");
    
    if (isNewSession) {
      // Check if remember me was set
      const rememberMe = localStorage.getItem("rememberMe");
      
      // OAuth users (no password) should always stay logged in
      const isOAuthUser = !session.user?.email?.includes("@") || session.user?.image;
      
      if (rememberMe !== "true" && !isOAuthUser) {
        // Remember me not checked and not OAuth - logout
        signOut({ redirect: false });
        return;
      }
      
      // Mark session as active
      sessionStorage.setItem("sessionActive", "true");
    }
  }, [session]);

  return null;
}
