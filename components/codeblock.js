import { useState } from "react";

export default function CodeBlock({ children, language }) {
    const [collapsed, setCollapsed] = useState(true);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        alert("Copied to clipboard!");
    };

    return (
        <div className="code-block-wrapper">
            <div className="code-block-header">
                <span className="code-lang">{language || "code"}</span>
                <div className="code-block-actions">
                    <button onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? "Expand" : "Collapse"}
                    </button>
                    <button onClick={handleCopy}>Copy</button>
                </div>
            </div>
            {!collapsed && (
                <pre>
                    <code>{children}</code>
                </pre>
            )}
        </div>
    );
}