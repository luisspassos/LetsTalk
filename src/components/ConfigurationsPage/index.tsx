import { PageTitle } from '../PageTitle';
import { Content } from './Content';

// const Content = dynamic(() => import('./Content').then((mod) => mod.Content), {
//   ssr: false,
// });

export function Configurations() {
  return (
    <>
      <PageTitle pageName='Configurações' />
      <Content />
    </>
  );
}
