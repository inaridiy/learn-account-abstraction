"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre className={cn("rounded-md border px-4 py-3 font-mono text-sm overflow-auto", className)}>
      <code>{children}</code>
    </pre>
  );
}
