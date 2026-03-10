"use client";

import { formatDate } from "@/lib/formatDate";
import { useState } from "react";

export default function CommentSection({ postId, comments }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        postId,
      }),
    });

    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", comment: "" });
  };

  return (
    <div className="mt-20">

      <h2 className="text-2xl font-bold mb-8">
        Comments ({comments?.length || 0})
      </h2>

      {/* Existing Comments */}
      <div className="space-y-6 mb-12">
        {comments?.map((c: any) => (
          <div
            key={c._id}
            className="border-b border-gray-200 dark:border-gray-700 pb-4"
          >

            <p className="font-semibold text-lg">{c.name}</p>

            <div className="flex justify-between items-start mt-1">

              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {c.comment}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(c?.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg space-y-4"
      >

        <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>

        <input
          placeholder="Enter your Name"
          className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Write your comment..."
          rows={4}
          className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
          value={form.comment}
          onChange={(e) =>
            setForm({ ...form, comment: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>

        {success && (
          <p className="text-green-600 text-lg text-center">
            Comment submitted for review.
          </p>
        )}
      </form>
    </div>
  );
}