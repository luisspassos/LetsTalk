import { Stack, useColorModeValue, Show } from '@chakra-ui/react';
import { AuthPageWrapper } from '../components/Auth/AuthPageWrapper';
import { AuthContentPageWrapper } from '../components/Auth/AuthContentPageWrapper';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirectToConversationsPageOrNot } from '../utils/redirectToConversationsPageOrNot';
import { PageTitle } from '../components/PageTitle';
import { Header } from 'components/Form/Header';
import { Form } from 'components/Registration/Form';
import { Description } from 'components/Registration/Description';
import { LoginLink } from 'components/Registration/LoginLink';

export default function Register() {
  return (
    <>
      <PageTitle pageName='Cadastro' />
      <AuthPageWrapper>
        <Header />
        <AuthContentPageWrapper gap='150px'>
          <Stack
            color={useColorModeValue('blue.900', 'gray.50')}
            spacing='20px'
            d={{ base: 'none', xl: 'flex' }}
          >
            <Description />
            <LoginLink />
          </Stack>
          <Stack spacing='20px' align='center'>
            <Form />
            <Show below='xl'>
              <LoginLink />
            </Show>
          </Stack>
        </AuthContentPageWrapper>
      </AuthPageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const redirectionToConversationsOrNot =
    await redirectToConversationsPageOrNot(ctx);

  return redirectionToConversationsOrNot;
};
