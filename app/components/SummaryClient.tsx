"use client";

import { useState } from "react";

export default function SummaryClient({ articleContent }: { articleContent: string }) {

    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const summarizeArticle = async () => {
        setLoading(true);

        const res = await fetch("/api/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: articleContent })
        });

        const data = await res.json();
        setSummary(data.response);
        setLoading(false);
    }
    return (
        <div className="my-6">
            <button
                onClick={summarizeArticle}
                className="
    px-4 py-2 
    bg-primary 
    text-white 
    dark:bg-blue-900 
    dark:text-white
    rounded 
    cursor-pointer 
    hover:bg-primary-dark 
    dark:hover:bg-blue-700
    transition
  "
            >
                <span className="text-yellow-300">✨</span>

                {loading ? "Summarizing..." : "AI Summary"}
            </button>

            {summary && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                    <h3 className="font-bold mb-2">Summary</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>

    )
}
