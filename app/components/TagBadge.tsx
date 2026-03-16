import { getTagColor } from "@/lib/tagColors";

interface TagBadgeProps {
    label: string;
    className?: string;
    rightIcon?: React.ReactNode;
    variant?: "default" | "filter";
}

export default function TagBadge({ label, href, className, rightIcon, variant = "default" }: TagBadgeProps & { href?: string }) {
    const color =
        variant === "filter" ? ""
            : getTagColor(label);

    return (
        <span
            className={`inline-flex text-xs px-3 py-1 rounded-full font-medium ${color} ${className}`}
        >
            {label}
            {rightIcon && <span>{rightIcon}</span>}
        </span>
    );
}