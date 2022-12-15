import { Configurations } from 'components/ConfigurationsPage';
import { Wrapper } from 'components/Sidebar/Wrapper';
import { GetServerSideProps } from 'next';
import { redirectToUserIfNoUser } from 'utils/redirectToHomeIfNoUser';

export default function ConfigurationsPage() {
  return (
    <Wrapper>
      <Configurations />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToUserIfNoUser;
