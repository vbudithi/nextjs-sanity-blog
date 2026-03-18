export function calculateReadTime(text: string) {
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
}