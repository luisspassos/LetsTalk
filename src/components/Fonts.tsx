import { Global } from '@emotion/react';

export function Fonts() {
  return (
    <Global
      styles={`
      @font-face {
        font-family: 'Twemoji';
        src: url('./fonts/Twemoji.Mozilla.ttf')
      }
    `}
    />
  );
}
