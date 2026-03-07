"use client";
import { useEffect, useState } from "react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (res.ok) fetchReviews();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Product Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <p className="text-white/60">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-white/20"}>★</span>
                      ))}
                    </div>
                    <span className="text-white/60">by {review.user?.name || "Anonymous"}</span>
                  </div>
                  <p className="text-white/60 text-sm">Product: {review.product?.name || "Unknown"}</p>
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-white/80">{review.comment}</p>
              <p className="text-white/40 text-sm mt-4">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
