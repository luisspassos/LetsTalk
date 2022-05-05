import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='description' content='Entre e converse com seus amigos!' />
        <link rel='manifest' href='/manifest.json' />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
