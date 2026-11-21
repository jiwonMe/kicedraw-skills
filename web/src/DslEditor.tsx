import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { StreamLanguage } from "@codemirror/language";
import { githubDark } from "@uiw/codemirror-theme-github";

const dsl = StreamLanguage.define({
  token(stream) {
    if (stream.eatSpace()) return null;
    if (stream.match(/^#.*/)) return "comment";
    if (stream.match(/^---[\w-]+---/)) return "keyword";
    if (stream.match(/^@[\w-]+/)) return "meta";
    if (stream.match(/^"(?:\\.|[^"\\])*"?/)) return "string";
    if (stream.match(/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i))
      return "number";
    if (stream.match(/^(?:true|false)\b/)) return "bool";
    if (stream.match(/^[A-Za-z_][\w-]*(?=\s*[([])/)) return "typeName";
    if (stream.match(/^[A-Za-z_][\w-]*(?=\s*=)/)) return "propertyName";
    if (stream.match(/^[A-Za-z_][\w-]*/)) return "variableName";
    if (stream.match(/^(?:->|[=:])/)) return "operator";
    stream.next();
    return null;
  },
});

export default function DslEditor({
  source,
  name,
}: {
  source: string;
  name: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    const view = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: source,
        extensions: [
          dsl,
          githubDark,
          lineNumbers(),
          EditorState.readOnly.of(true),
          EditorView.editable.of(false),
          EditorView.contentAttributes.of({
            tabindex: "0",
            "aria-label": `${name} DSL 원문`,
            "aria-readonly": "true",
            role: "textbox",
            "aria-multiline": "true",
          }),
        ],
      }),
    });
    return () => view.destroy();
  }, [source, name]);
  return <div className="dsl-editor" ref={host} />;
}
