import { visit } from "unist-util-visit";

export default function remarkAdmonition() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === "containerDirective") {
                const data = node.data || (node.data = {});
                data.hName = "div";
                data.hProperties = {
                    className: ["admonition", node.name], // :::info -> <div class="admonition info">
                };
            }
        });
    };
}
