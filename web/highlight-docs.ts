import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import { dslTokens } from "./src/dsl-tokens";

hljs.registerLanguage("bash", bash);
export function highlightDocs(
  code: string,
  isShell: boolean,
  escape: (text: string) => string,
): string {
  if (isShell) return hljs.highlight(code, { language: "bash" }).value;
  return code
    .split("\n")
    .map((line) => {
      let html = "";
      while (line) {
        const rule = dslTokens.find(([pattern]) => pattern.test(line));
        const token = rule ? line.match(rule[0])![0] : line[0];
        const text = escape(token);
        html += rule?.[1]
          ? `<span class="tok-${rule[1]}">${text}</span>`
          : text;
        line = line.slice(token.length);
      }
      return html;
    })
    .join("\n");
}
