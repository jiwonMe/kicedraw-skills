// Shared lexical rules for the static docs and the CodeMirror editor.
export const dslTokens = [
  [/^\s+/, null],
  [/^#.*/, "comment"],
  [/^---[\w-]+---/, "keyword"],
  [/^@[\w-]+/, "meta"],
  [/^"(?:\\.|[^"\\])*"?/, "string"],
  [/^[+-]?(?:0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)/i, "number"],
  [/^(?:true|false)\b/, "bool"],
  [/^[A-Za-z_]\w*(?=\s*[([])/, "typeName"],
  [/^[A-Za-z_]\w*(?=\s*=)/, "propertyName"],
  [/^[A-Za-z_]\w*/, "variableName"],
  [/^(?:->|[=:+*/^{}$-])/, "operator"],
] as const;
