"use client";

import { useEffect, useRef, useState } from "react";

interface ArticleChatbotProps {
    article: string;
}


export default function Chatbot({ article }: ArticleChatbotProps) {
    console.log("ARTICLE PASSED:", article);

    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [position, setPosition] = useState({ x: 300, y: 300 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    //  Pop sound
    const playPop = () => {
        const audio = new Audio("/pop.mp3");
        audio.volume = 0.4;
        audio.play();
    };

    // Drag handlers
    const startDrag = (e: any) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const onDrag = (e: any) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const stopDrag = () => setDragging(false);

    useEffect(() => {
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", stopDrag);
        return () => {
            window.removeEventListener("mousemove", onDrag);
            window.removeEventListener("mouseup", stopDrag);
        };
    });


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // send message
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            setTyping(true);
            setLoading(true);

            const res = await fetch("/api/chat-article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    article
                }),
            });

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            let botReply = "";
            let buffer = "";

            if (reader) {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        if (!line.trim()) continue;

                        try {
                            const json = JSON.parse(line);
                            const content = json?.message?.content;

                            if (content) {
                                botReply += content;

                                setMessages((prev) => {
                                    const last = prev[prev.length - 1];

                                    if (last?.role === "assistant") {
                                        return [
                                            ...prev.slice(0, -1),
                                            {
                                                role: "assistant",
                                                content: last.content + content,
                                            },
                                        ];
                                    }

                                    return [
                                        ...prev,
                                        { role: "assistant", content },
                                    ];
                                });
                            }
                        } catch (err) {
                            console.error("Parse error:", err);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Chat error:", err);
        } finally {
            setTyping(false);
            setLoading(false);
        }
    };

    return (
        <>
            {!open && (
                <button
                    onClick={() => {
                        playPop();
                        setOpen(true);
                        setMinimized(false);
                    }}
                    className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition cursor-pointer hover:bg-blue-600"
                >
                    🤖
                </button>
            )}

            {/* Chat window*/}
            {open && (
                <div
                    className="fixed z-50 w-[350px]"
                    style={{
                        top: position.y,
                        left: position.x,
                    }}
                >
                    <div className="border rounded-xl shadow-2xl bg-white dark:bg-neutral-900 dark:border-neutral-700 overflow-hidden">

                        <div
                            className={`flex justify-between items-center px-4 py-3 bg-blue-600 text-white select-none ${dragging ? "cursor-grabbing" : "cursor-grab"
                                }`}
                            onMouseDown={startDrag}
                        >
                            <span className="font-semibold">
                                VivAI • Assistant
                            </span>

                            <div className="flex gap-2">
                                <button onClick={() => setMinimized(!minimized)}>
                                    {minimized ? "🔼" : "➖"}
                                </button>

                                <button onClick={() => setOpen(false)}>
                                    ✖
                                </button>
                            </div>
                        </div>

                        {!minimized && (
                            <div className="p-4">
                                <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                    Hi, I’m <strong>VivAI</strong>. Ask me anything 👇
                                </div>
                                <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-neutral-700">

                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                        VivAI helps you explore articles, answer questions, and understand content faster.
                                    </p>
                                </div>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4 pr-2">
                                    {messages.map((m, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-lg text-sm ${m.role === "user"
                                                ? "bg-gray-200 dark:bg-neutral-700"
                                                : "bg-blue-100 dark:bg-blue-900/40"
                                                }`}
                                        >
                                            {m.content}
                                        </div>
                                    ))}

                                    {typing && (
                                        <div className="text-xs text-gray-500 animate-pulse">
                                            VivAI is thinking…
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 border rounded-lg p-2 dark:bg-neutral-800 dark:border-neutral-600"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") sendMessage();
                                        }}
                                        placeholder="Ask VivAI..."
                                    />

                                    <button
                                        onClick={sendMessage}
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                                    >
                                        {loading ? "..." : "Send"}
                                    </button>
                                </div>
                                <div className="text-center text-xs text-gray-500 mt-3 pt-2 border-t">
                                    Powered by VivAI
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}