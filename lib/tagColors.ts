export const tagColorMap: Record<string, string> = {
    "chatgpt": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    "ai hardware": "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
    "google-gemini": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    "anthropic-claude": "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
    "ai": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
    "machine learning": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    "ai agents": "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
};

const fallbackColors = [
    "bg-blue-500/20 text-blue-400",
    "bg-purple-500/20 text-purple-400",
    "bg-green-500/20 text-green-400",
    "bg-orange-500/20 text-orange-400",
    "bg-pink-500/20 text-pink-400",
];

export function getTagColor(label: string) {
    const normalized = label.trim().toLowerCase();

    return (
        tagColorMap[normalized] ||
        fallbackColors[Math.abs(normalized.length) % fallbackColors.length]
    );
}