import { useMessageInputRef } from '../contexts/MessageInputRef';

export function useSetMessageInputSize() {
  const { ref } = useMessageInputRef();

  const input = ref.current;

  function setMessageInputSize() {
    input?.dispatchEvent(new Event('change', { bubbles: true }));
  }

  return { setMessageInputSize };
}
