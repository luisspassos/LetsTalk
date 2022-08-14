let continueInputEvent = true;

function handleInput() {
  if (!continueInputEvent) {
    return;
  }

  continueInputEvent = false;

  setTimeout(() => {
    continueInputEvent = true;
  }, 0);
}
