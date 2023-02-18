import { useMessageInputRef } from 'contexts/MessageInputRef';

export function useSetMessageInputSize() {
  const { ref } = useMessageInputRef();

  function setMessageInputSize() {
    const textarea = ref.current;

    if (textarea === null) return;

    const maxHeight = 133;
    const scrollHeight = textarea.scrollHeight;

    const getMeasure = (number: number) => `${number}px`;

    if (scrollHeight > maxHeight) {
      textarea.style.height = getMeasure(maxHeight);
      textarea.style.overflowY = 'auto';
    } else {
      const getBorderWidth = () => {
        const styles = getComputedStyle(textarea);

        const getNumber = (string: string) => parseInt(string, 10);

        const borderWidth =
          getNumber(styles.borderTopWidth) +
          getNumber(styles.borderBottomWidth);

        return borderWidth;
      };

      const borderWidth = getBorderWidth();

      textarea.style.overflowY = 'hidden';
      textarea.style.height = '0';

      const newScrollHeight = textarea.scrollHeight;

      textarea.style.height = getMeasure(newScrollHeight + borderWidth);
    }
  }

  return { setMessageInputSize };
}
