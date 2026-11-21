import { StreamLanguage } from "@codemirror/language";
import { dslTokens } from "./dsl-tokens";

export const dsl = StreamLanguage.define({
  token(stream) {
    for (const [pattern, style] of dslTokens) {
      if (stream.match(pattern)) return style;
    }
    stream.next();
    return null;
  },
});
