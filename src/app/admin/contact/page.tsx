"use client";
import { useEffect, useState } from "react";

export default function AdminContactPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/contact");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
    if (res.ok) fetchMessages();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <p className="text-white/60">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{msg.name}</h3>
                  <p className="text-white/60">{msg.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-white/80 mb-2"><strong>Subject:</strong> {msg.subject}</p>
              <p className="text-white/70">{msg.message}</p>
              <p className="text-white/40 text-sm mt-4">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
