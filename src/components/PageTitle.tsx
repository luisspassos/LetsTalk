import Head from 'next/head';

type PageTitleProps = {
  pageName: string;
};

export function PageTitle({ pageName }: PageTitleProps) {
  return (
    <Head>
      <title>{pageName} - Let&apos;s Talk</title>
    </Head>
  );
}
