"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { showToast } = useToast();

  useEffect(() => {
    fetchReturns();
  }, [filter]);

  const fetchReturns = async () => {
    try {
      const url = filter === "all" ? "/api/returns" : `/api/returns?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setReturns(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch returns");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/returns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        showToast(`Return request ${status}`, "success");
        fetchReturns();
      } else {
        showToast("Failed to update status", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-300";
      case "approved": return "bg-green-500/20 text-green-300";
      case "rejected": return "bg-red-500/20 text-red-300";
      case "completed": return "bg-blue-500/20 text-blue-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center w-full">
        <p className="text-white">Loading return requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Return Requests</h1>
          <p className="text-white/60 text-sm">Manage customer return requests</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {["all", "pending", "approved", "rejected", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {returns.length === 0 ? (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-white/60">No return requests found</p>
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {returns.map((returnReq) => (
            <div
              key={returnReq.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-4 md:p-6 w-full overflow-hidden"
            >
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white break-words">{returnReq.productName}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(returnReq.status)}`}>
                      {returnReq.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm break-all">Order: {returnReq.orderNumber}</p>
                  <p className="text-white/60 text-sm">
                    Submitted: {new Date(returnReq.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {returnReq.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => updateStatus(returnReq.id, "approved")}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(returnReq.id, "rejected")}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {returnReq.status === "approved" && (
                  <button
                    onClick={() => updateStatus(returnReq.id, "completed")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all w-full sm:w-auto"
                  >
                    Mark Completed
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-white/60">Customer Email</p>
                  <p className="text-white break-all">{returnReq.email}</p>
                </div>
                <div>
                  <p className="text-white/60">Phone</p>
                  <p className="text-white break-all">{returnReq.phone}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white/60 text-sm mb-1">Reason</p>
                <p className="text-white capitalize break-words">{returnReq.reason.replace("-", " ")}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm mb-2">Description</p>
                <p className="text-white text-sm break-words">{returnReq.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
