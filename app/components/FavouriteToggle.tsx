"use client";

import { supabase } from '@/lib/supabase/client';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from "react-hot-toast";

interface FavouriteToggleProps {
    postId: string;
}

export default function FavouriteToggle({ postId }: FavouriteToggleProps) {
    const router = useRouter();
    const [isFavourite, setIsFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                //Not loggedin user, do not fetch favourites
                if (!user) return;
                const { data, error } = await supabase
                    .from('favourites')
                    .select('post_id')
                    .eq('user_id', user.id)
                    .eq('post_id', postId);
                setIsFavourite(!!data?.length);
            } catch (error) {
                console.error("Error fetching favourites:", error);
            }
        };
        fetchFavourites();
    }, [postId]);

    const handleFavourites = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);

        //check login status

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            // User is not logged in
            if (!user) {
                toast.error(
                    "Please login to add articles to your favourites."
                );

                router.push("/auth/login");
                return;
            }
            if (!postId) {
                console.error("FavouriteToggle: postId is missing");
                toast.error("Unable to save this article.");
                return;
            }

            // Remove favourite
            if (isFavourite) {
                const { error } = await supabase
                    .from("favourites")
                    .delete()
                    .eq("user_id", user.id)
                    .eq("post_id", postId);

                if (error) {
                    throw error;
                }

                setIsFavourite(false);

                toast.success("Removed from favourites");
            }

            // Add favourite
            else {
                const { error } = await supabase
                    .from("favourites")
                    .insert({
                        user_id: user.id,
                        post_id: postId,
                    });

                if (error) {
                    throw error;
                }

                setIsFavourite(true);

                toast.success("Added to favourites");
            }
        } catch (error) {
            console.error(
                "Favourite error:",
                error
            );

            toast.error(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <button
            onClick={handleFavourites}
            aria-label={
                isFavourite ? "Remove from favourites" : "Add to favourites"
            }

            className={`absolute top-4 right-4
                w-11 h-11
                rounded-full
                flex items-center justify-center
                backdrop-blur-md
                border
                shadow-lg
                transition-all duration-200
                hover:scale-105
                cursor-pointer
                ${isFavourite
                    ? "bg-amber-600/90 border-amber-300 text-white"
                    : "bg-black/60 border-white/30 text-white hover:bg-black/70"
                }`}
        >
            <Bookmark
                className="w-5 h-5"
                strokeWidth={2}
                fill={isFavourite ? "currentColor" : "none"}
            />
        </ button>
    )
}
