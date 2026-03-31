export function portableTextToPlainText(blocks: any[] = []) {
    if (!blocks) return "";

    return blocks
        .map((block) => {
            // handle normal text blocks
            if (block._type === "block" && block.children) {
                return block.children.map((child: any) => child.text).join("");
            }
            return "";
        })
        .join("\n\n");
}