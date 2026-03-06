"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 left-4 right-4 z-50 space-y-2 max-w-sm mx-auto pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`backdrop-blur-xl border rounded-xl px-4 py-3 shadow-2xl animate-in slide-in-from-top pointer-events-auto break-words ${
              toast.type === "success"
                ? "bg-green-500/20 border-green-500/50 text-green-100"
                : toast.type === "error"
                ? "bg-red-500/20 border-red-500/50 text-red-100"
                : "bg-blue-500/20 border-blue-500/50 text-blue-100"
            }`}
          >
            <div className="flex items-start gap-2">
              {toast.type === "success" && <span className="text-xl flex-shrink-0">✓</span>}
              {toast.type === "error" && <span className="text-xl flex-shrink-0">✕</span>}
              {toast.type === "info" && <span className="text-xl flex-shrink-0">ℹ</span>}
              <span className="font-medium text-sm leading-tight">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
