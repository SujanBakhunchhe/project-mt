"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ToastProvider";
import { PrimaryButton } from "@/components/Buttons";

export function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]));
  }, [productId]);

  const submitReview = async () => {
    if (!session) {
      showToast("Please login to review", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setComment("");
        showToast("Review submitted!", "success");
      }
    } catch (error) {
      showToast("Failed to submit review", "error");
    } finally {
      setLoading(false);
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Reviews ({reviews.length})</h2>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl font-bold text-white">{avgRating}</span>
        <div className="flex">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`text-2xl ${i <= parseFloat(avgRating) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
          ))}
        </div>
      </div>

      {session && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl">
          <h3 className="text-white font-bold mb-3">Write a Review</h3>
          <div className="flex gap-2 mb-3">
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setRating(i)} className={`text-3xl ${i <= rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white mb-3"
            rows={3}
          />
          <PrimaryButton onClick={submitReview} disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </PrimaryButton>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold">{review.user.name}</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={`${i <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                ))}
              </div>
            </div>
            <p className="text-white/70">{review.comment}</p>
            <p className="text-white/50 text-sm mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
