"use client";

import Prism from "prismjs";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

export default function CodeBlock({ value }: { value: any }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(value.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative my-6 rounded-lg border border-gray-700 bg-[#0d1117]">
            {/* Filename */}
            {value.filename && (
                <div className="px-4 py-2 text-sm text-gray-300 bg-[#151b23] border-b border-gray-700">
                    {value.filename}
                </div>
            )}
            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className=" absolute top-2 right-3 z-50 px-3 py-1 text-xs rounded-md  bg-gray-900 text-gray-200 border border-gray-600 hover:bg-gray-800 transition cursor-pointer"
            >
                {copied ? "Copied!" : "Copy"}
            </button>

            {/* Code */}
            <pre suppressHydrationWarning
                className="p-4 overflow-x-auto text-sm leading-relaxed relative z-10 overflow-y-auto max-h-[500px]">
                <code className={`language-${value.language || "Javascript"}`}>
                    {value.code}
                </code>
            </pre>
        </div>
    );
}