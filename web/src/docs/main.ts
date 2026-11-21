import "../../style.css";
import "./docs.css";

for (const button of document.querySelectorAll<HTMLButtonElement>(
  "button[data-copy]",
)) {
  if (!navigator.clipboard) break;
  button.hidden = false;
  let timer: number;
  button.addEventListener("click", async () => {
    const code = button.closest(".docs-code")?.querySelector("code");
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.textContent ?? "");
      button.textContent = "복사 완료";
    } catch {
      button.textContent = "직접 선택해 주세요";
    }
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      button.textContent = "복사";
    }, 1800);
  });
  button.setAttribute("aria-live", "polite");
}
