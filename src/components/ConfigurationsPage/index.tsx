import dynamic from 'next/dynamic';
import { PageTitle } from '../PageTitle';

const Content = dynamic(() => import('./Content').then((mod) => mod.Content), {
  ssr: false,
});

export function Configurations() {
  return (
    <>
      <PageTitle pageName='Configurações' />
      <Content />
    </>
  );
}
