export function resizeObserver(
  callback: ResizeObserverCallback,
  element: Element
) {
  const observer = new ResizeObserver(callback);

  observer.observe(element);

  function unobserve() {
    observer.unobserve(element);
  }

  return { unobserve };
}
