import { toPlainText } from "@portabletext/react";

export function extractPlainText(content: any) {
    if (!content || !Array.isArray(content)) {
        return "";
    }

    try {
        return toPlainText(content);
    } catch (error) {
        console.error("Error converting PortableText:", error);
        return "";
    }
}