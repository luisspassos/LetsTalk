import { Stack, useColorModeValue, Show } from '@chakra-ui/react';
import { AuthPageWrapper } from '../components/Auth/AuthPageWrapper';
import { AuthContentPageWrapper } from '../components/Auth/AuthContentPageWrapper';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirectToConversationsPageIfThereIsUser } from '../utils/redirectToConversationsPageIfThereIsUser';
import { PageTitle } from '../components/PageTitle';
import { Form } from 'components/RegistrationPage/Form';
import { Description } from 'components/RegistrationPage/Description';
import { LoginLink } from 'components/RegistrationPage/LoginLink';

export default function Register() {
  return (
    <>
      <PageTitle pageName='Cadastro' />
      <AuthPageWrapper>
        <AuthContentPageWrapper gap='150px'>
          <Stack
            color={useColorModeValue('blue.900', 'gray.50')}
            spacing='20px'
            display={{ base: 'none', xl: 'flex' }}
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
    await redirectToConversationsPageIfThereIsUser(ctx);

  return redirectionToConversationsOrNot;
};
