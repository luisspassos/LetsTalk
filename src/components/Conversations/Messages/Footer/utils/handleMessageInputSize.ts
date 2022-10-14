export function handleMessageInputSize(messageInput: HTMLTextAreaElement) {
  const maxHeight = 133;
  const scrollHeight = messageInput.scrollHeight;

  const getMeasure = (number: number) => `${number}px`;

  if (scrollHeight > maxHeight) {
    messageInput.style.height = getMeasure(maxHeight);
    messageInput.style.overflowY = 'auto';
  } else {
    const getBorderWidth = () => {
      const styles = getComputedStyle(messageInput);

      const getNumber = (string: string) => parseInt(string, 10);

      const borderWidth =
        getNumber(styles.borderTopWidth) + getNumber(styles.borderBottomWidth);

      return borderWidth;
    };

    const borderWidth = getBorderWidth();

    messageInput.style.overflowY = 'hidden';
    messageInput.style.height = '0';

    const newScrollHeight = messageInput.scrollHeight;

    messageInput.style.height = getMeasure(newScrollHeight + borderWidth);
  }
}
