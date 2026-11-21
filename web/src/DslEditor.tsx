import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { githubDark } from "@uiw/codemirror-theme-github";
import { dsl } from "./dsl-language";

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
