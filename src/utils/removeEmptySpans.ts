export function removeEmptySpans(messageInput: HTMLDivElement | null) {
  const spans = messageInput?.querySelectorAll('span:empty');

  if (!spans) return;

  for (const span of spans) {
    span.remove();
  }
}
