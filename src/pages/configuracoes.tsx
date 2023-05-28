import { Configurations } from 'components/ConfigurationsPage';
import { Loading } from 'components/ConfigurationsPage/Loading';
import { Wrapper } from 'components/Sidebar/Wrapper';
import { useOnAuthStateChanged } from 'hooks/useOnAuthStateChanged';
import { GetServerSideProps } from 'next';
import { redirectToHomeIfNoUser } from 'utils/redirectToHomeIfNoUser';

export default function ConfigurationsPage() {
  useOnAuthStateChanged();

  return (
    <>
      <Wrapper>
        <Configurations />
      </Wrapper>
      <Loading />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToHomeIfNoUser;
