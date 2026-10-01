"use client";

import { useState } from "react";
import {
    Share2,
    X,
    Facebook,
    MessageCircle,
    Linkedin,
    Copy,
    Check,
} from "lucide-react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

export default function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;
    const handleShare = (platform: string) => {

        let shareLink = "";

        switch (platform) {
            case "X":
                shareLink = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                break;

            case "facebook":
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;

            case "whatsapp":
                shareLink = `https://wa.me/?text=${url}`;
                break;

            case "reddit":
                shareLink = `https://www.reddit.com/submit?url=${url}&title=${title}`;
                break;

            case "linkedin":
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;

            default:
                return;
        }

        window.open(
            shareLink,
            "_blank",
            "width=700,height=600,noopener,noreferrer"
        );
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Share this article
                    </h3>

                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Social Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => handleShare("X")}
                        className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                        aria-label="Share on X"
                    >
                        <span className="text-lg font-bold">𝕏</span>
                    </button>

                    <button
                        onClick={() => handleShare("facebook")}
                        className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                        aria-label="Share on Facebook"
                    >
                        <Facebook className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleShare("whatsapp")}
                        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                        aria-label="Share on WhatsApp"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleShare("reddit")}
                        className="flex items-center justify-center w-14 h-14 bg-orange-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                        aria-label="Share on Reddit"
                    >
                        <Share2 className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center justify-center w-14 h-14 bg-blue-700 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </button>
                </div>
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                    </div>

                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                            or
                        </span>
                    </div>
                </div>

                {/* Copy URL */}
                <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                        Copy Link
                    </p>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={url}
                            readOnly
                            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            onClick={(e) => e.currentTarget.select()}
                        />

                        <button
                            onClick={handleCopyLink}
                            className={`px-5 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${copied
                                ? "bg-green-500 text-white"
                                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                }`}
                            aria-label={
                                copied ? "Link copied" : "Copy link"
                            }
                        >
                            {copied ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {copied && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2 text-center">
                            ✓ Link copied to clipboard!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}