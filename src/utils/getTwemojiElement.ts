export function getTwemojiElement(text: string, url: string) {
  const el = document.createElement('span');
  el.className = 'emoji';
  el.textContent = text;
  el.style.backgroundImage = `url(${url})`;

  return el;
}
