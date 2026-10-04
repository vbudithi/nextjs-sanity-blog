"use client";

import { formatDate } from "@/lib/formatDate";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CommentSectionProps {
  postId: string;
  comments: {
    _id: string;
    name: string;
    email: string;
    comment: string;
    createdAt: string;
  }[];
}
export default function CommentSection({ postId, comments = [] }: CommentSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    createdAt: new Date().toISOString(),
  });

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();

    //keep track of auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };

  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to post a comment");
      router.push("/auth/login");
      return;
    }
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          postId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      setSuccess(true);
      setForm({ name: "", email: "", comment: "", createdAt: new Date().toISOString() });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.push("/auth/register");
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

      {loading ? (
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Loading...
          </p>
        </div>
      ) : !user ? (
        <div className="relative">
          {/* 
Greyed out comment form for non-logged-in users */}
          <div
            className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg space-y-4 opacity-50"
          >
            <h3 className="text-lg font-semibold mb-2">
              Leave a Comment
            </h3>

            <input
              disabled
              placeholder="Enter your Name*"
              className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
            />

            <input
              disabled
              placeholder="Email*"
              type="email"
              className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
            />

            <textarea
              disabled
              placeholder="Write your comment...*"
              rows={4}
              className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
            />

            <button
              type="button"
              disabled
              className="bg-green-600 text-white px-6 py-2 rounded-md cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>

          {/* Center login/register overlay */}
          <div className="absolute inset-0 flex items-center justify-center">

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-8 py-6 text-center">

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Please Login or Register to Comment.
              </p>

              <div className="flex justify-center gap-3">

                <button
                  type="button"
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md cursor-pointer transition-colors"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  className="border border-gray-300 dark:border-gray-700 px-6 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  Register
                </button>

              </div>

            </div>

          </div>

        </div>
      ) : (

        //logged in user, show comment form
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg space-y-4"
        >

          <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>

          <input
            placeholder="Enter your Name*"
            className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Email*"
            type="email"
            className="w-full border p-3 rounded-md bg-white dark:bg-slate-950"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Write your comment...*"
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
      )}
    </div>
  );
}