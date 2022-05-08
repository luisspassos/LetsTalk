import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import { colors } from '../styles/colors';
import { themeConfig } from '../styles/theme';

export default function Document() {
  return (
    <Html lang='pt-BR'>
      <Head>
        <link rel='shortcut icon' href='./favicon.svg' type='image/x-icon' />
        <link
          rel='apple-touch-icon'
          href='./images/pwa-icons/apple-touch-icon.png'
        />

        <link rel='manifest' href='./manifest.json' />

        <meta
          name='description'
          content='Entre e converse com os seus amigos!'
        />

        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content={colors.gray[50]}
        />

        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content={colors.blue[900]}
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
