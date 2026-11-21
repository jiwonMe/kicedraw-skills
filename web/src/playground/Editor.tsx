import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { keymap } from "@codemirror/view";
import { githubDark } from "@uiw/codemirror-theme-github";
import { dsl } from "../dsl-language";

export function Editor({
  initial,
  onChange,
}: {
  initial: string;
  onChange: (value: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = host.current;
    if (!parent) return;
    const view = new EditorView({
      parent,
      state: EditorState.create({
        doc: initial,
        extensions: [
          dsl,
          githubDark,
          lineNumbers(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.contentAttributes.of({ "aria-label": "DSL 코드" }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onChange(update.state.doc.toString());
          }),
        ],
      }),
    });
    return () => view.destroy();
  }, [initial, onChange]);
  return <div className="pg-editor" ref={host} />;
}
