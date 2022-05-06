import { Html, Head, Main, NextScript } from 'next/document';
import { colors } from '../styles/colors';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto&display=swap'
          rel='stylesheet'
        />
        <link rel='shortcut icon' href='./favicon.svg' type='image/x-icon' />

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

        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
