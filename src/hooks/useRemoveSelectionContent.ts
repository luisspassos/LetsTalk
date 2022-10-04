import { useRemoveEmptySpans } from './useRemoveEmptySpans';

export function useRemoveSelectionContent() {
  const { removeEmptySpans } = useRemoveEmptySpans();

  const selection = getSelection();

  function removeSelectionContent() {
    if (selection?.isCollapsed) return;

    selection?.deleteFromDocument();

    removeEmptySpans();
  }

  return { removeSelectionContent };
}
