export function renderMarkdown(markdown: string, sourcePath: string, options?: {
  stripTitle?: boolean;
  imageOverrides?: Record<string, string>;
}): string;
