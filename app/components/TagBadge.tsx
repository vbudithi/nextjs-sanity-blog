interface TagBadgeProps {
    label: string;
    className?: string;
}

export default function TagBadge({ label, className }: TagBadgeProps) {
    const normalized = label.trim();
    const tagColorMap: Record<string, string> = {
        "ChatGPT": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
        "AI Hardware": "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
        "Google-Gemini": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
        "Anthropic-Claude": "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
        "AI": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
        "Machine Learning": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
        "AI Agents": "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
    };

    const fallbackColors = [
        "bg-blue-500/20 text-blue-400",
        "bg-purple-500/20 text-purple-400",
        "bg-green-500/20 text-green-400",
        "bg-orange-500/20 text-orange-400",
        "bg-pink-500/20 text-pink-400",
    ];

    const color =
        tagColorMap[normalized] ||
        fallbackColors[Math.abs(normalized.length) % fallbackColors.length];

    return (
        <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${color} ${className}`}
        >
            {label}
        </span>
    );
}