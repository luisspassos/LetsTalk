import { CenterForm } from '../components/Form/CenterForm';
import { Box } from '@chakra-ui/react';
import { PageTitle } from '../components/PageTitle';
import { BackLink } from 'components/BackLink';
import { Title } from 'components/ForgotMyPasswordPage/Form/Title';
import { Form } from 'components/ForgotMyPasswordPage/Form';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirectToConversationsPageIfThereIsUser } from 'utils/redirectToConversationsPageIfThereIsUser';

export default function IForgotMyPassword() {
  return (
    <>
      <PageTitle pageName='Esqueci minha senha' />
      <Box overflowX='hidden' data-testid='forgot password page'>
        <CenterForm>
          <Title />
          <Form />
          <BackLink text='Voltar' mt='1rem' />
        </CenterForm>
      </Box>
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
