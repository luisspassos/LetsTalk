import { useMessageInput } from '../contexts/MessageInputContext';

export function useRemoveEmptySpans() {
  const { messageInput } = useMessageInput();

  function removeEmptySpans() {
    const spans = messageInput?.querySelectorAll('span:empty');

    if (!spans) return;

    for (const span of spans) {
      span.remove();
    }
  }

  return { removeEmptySpans };
}
