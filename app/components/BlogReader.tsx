"use client";

import { useState } from "react";

export default function BlogReader({ text }: { text: string }) {
    const [isReading, setIsReading] = useState(false);

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsReading(false);
        speechSynthesis.speak(utterance);
        setIsReading(true);
    };

    const stop = () => {
        speechSynthesis.cancel();
        setIsReading(false);
    };

    return (
        <div className="flex gap-3 my-4">
            {!isReading ? (
                <button
                    onClick={speak}
                    className="px-3 py-1  bg-purple-800 text-white rounded-md cursor-pointer"
                >
                    🔊 Listen
                </button>
            ) : (
                <button
                    onClick={stop}
                    className="px-3 py-1 bg-red-800 text-white rounded-md cursor-pointer"
                >
                    ⏹ Stop
                </button>
            )}
        </div>
    );
}