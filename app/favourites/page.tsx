
"use client";

import { simpleBlogCard } from '@/lib/interface';
import  { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from "next/navigation";

export default function Favourites() {
const router = useRouter();
const [posts, setPosts]=useState<simpleBlogCard[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
        const loadFavourites = async () => {
            try {
                // Get logged-in user
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                // Not logged in
                if (!user) {
                    router.push("/auth/login");
                    return;
                }

                // Get favourite post IDs
                const { data: favourites, error } = await supabase
                    .from("favourites")
                    .select("post_id")
                    .eq("user_id", user.id);

                if (error) {
                    console.error("Error loading favourites:", error);
                    return;
                }

                if (!favourites || favourites.length === 0) {
                    setPosts([]);
                    return;
                }

                const postIds = favourites.map(
                    (favourite) => favourite.post_id
                );

                // Get matching Sanity posts
                const response = await fetch("/api/favourites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        postIds,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to load favourite posts");
                }

                const favouritePosts = await response.json();
                setPosts(favouritePosts);
            } catch (error) {
                console.error("Error loading favourites:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFavourites();
    }, [router]);

if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">
                    Favourites
                </h1>

                <p className="text-gray-500">
                    Loading your favourites...
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">

            <div className="flex items-center justify-center gap-3 mb-8">
                <h1 className="text-3xl font-bold">
                    My Favourites
                </h1>

                <span className="text-amber-500 text-2xl">
                    🔖
                </span>
            </div>


            {posts.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-5xl mb-4">
                        🔖
                    </div>

                    <h2 className="text-xl font-semibold mb-2">
                        No favourites yet
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        Articles you save will appear here.
                    </p>
                </div>
            
            ):(
                <div className="flex flex-wrap gap-6">
                    {posts.map((post) => (
                        <BlogCard
                            key={post._id}
                            post={post}
                            activeCard={null}
                            setActiveCard={() => {}}
                            onUnfavourite={(postID)=>{
                                setPosts((currentPosts)=>
                                currentPosts.filter(
                                    (currentPosts)=>currentPosts._id !==postID
                                ))
                            }}
                        />
                    ))}
                </div>
            )}
            </main>
        
    )
}
