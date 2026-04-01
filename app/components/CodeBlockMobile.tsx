"use client";

import Prism from "prismjs";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

export default function CodeBlockMobile({ value }: { value: any }) {
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
        <div className="my-6 rounded-lg border border-gray-700 bg-[#0d1117] overflow-hidden">
            {/* Filename */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#151b23] border-b border-gray-700">
                <span className="text-xs text-gray-400 truncate">
                    {value.filename || value.language || "Jav"}
                </span>
                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            {/* Scroll Container */}
            {/* grid-cols-1 + min-w-0 is the only way to stop a child from expanding a flex parent in mobilemode*/}
            <div className="my-6 w-full max-w-full grid grid-cols-1 min-w-0">
                <div className="rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                            {value.language || "JavaScript"}
                        </span>
                    </div>

                    {/* Scrollable Area */}
                    <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-700">
                        <pre

                            className="p-4 font-mono text-xs whitespace-pre-wrap break-words leading-relaxed text-gray-300 relative z-10"
                        >
                            <code
                                className={`language-${value.language || "javascript"} block w-full  max-h-[500px]`}
                                style={{ whiteSpace: 'pre', wordBreak: 'normal' }}
                            >
                                {value.code}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>


    );
}