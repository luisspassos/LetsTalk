export function positionSelectionIfValueHasBeenPlacedCloseToAnEmoji(
  selection: Selection | null,
  selectionRange: Range | undefined
) {
  const elementThatIsCloseToTheValueToBeInserted =
    selection?.anchorNode?.parentElement;

  const valueHasBeenPlacedCloseToAnEmoji =
    elementThatIsCloseToTheValueToBeInserted?.className === 'emoji';

  if (valueHasBeenPlacedCloseToAnEmoji) {
    const valueHasBeenPlacedAtTheBeginningOfTheInput =
      selection?.anchorOffset === 0;

    if (valueHasBeenPlacedAtTheBeginningOfTheInput) {
      selectionRange?.setStartBefore(elementThatIsCloseToTheValueToBeInserted);
    } else {
      selectionRange?.setStartAfter(elementThatIsCloseToTheValueToBeInserted);
    }
  }
}
