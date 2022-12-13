import { BackLink } from '../components/BackLink';
import { CenterForm } from '../components/Form/CenterForm';
import { Box } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirectToConversationsPageOrNot } from '../utils/redirectToConversationsPageOrNot';
import { PageTitle } from '../components/PageTitle';
import { Title } from 'components/ForgotMyPassword/Form/Title';
import { Form } from 'components/ForgotMyPassword/Form';

export default function IForgotMyPassword() {
  return (
    <>
      <PageTitle pageName='Esqueci minha senha' />
      <Box overflowX='hidden'>
        <CenterForm>
          <Title />
          <Form />
          <BackLink text='Voltar' route='/' mt='1rem' />
        </CenterForm>
      </Box>
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
