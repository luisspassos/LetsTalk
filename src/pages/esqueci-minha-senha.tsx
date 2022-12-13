import { BackLink } from '../components/BackLink';
import { Button } from '../components/Form/Button';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { CenterForm } from '../components/Form/CenterForm';
import { toast } from '../utils/Toasts/toast';
import { Box } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirectToConversationsPageOrNot } from '../utils/redirectToConversationsPageOrNot';
import { PageTitle } from '../components/PageTitle';
import { Title } from 'components/ForgotMyPassword/Form/Title';

type EmailFormData = {
  email: string;
};

type FormFirebaseError = Record<
  string,
  {
    type: keyof EmailFormData;
    message: string;
  }
>;

const emailFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
});

export const successToastWhenSendingToEmailToChangePassword = () =>
  toast({
    title: 'Email enviado',
    description: 'Cheque seu email para redefinir sua senha',
    status: 'success',
  });

export default function IForgotMyPassword() {
  return (
    <>
      <PageTitle pageName='Esqueci minha senha' />
      <Box overflowX='hidden'>
        <CenterForm>
          <Title />
          <FormWrapper onSubmit={handleSendEmail}>
            <Input
              error={errors.email}
              id='email'
              inputProps={{
                placeholder: 'Coloque seu email',
                type: 'email',
                ...register('email'),
              }}
              label='Email'
            />
            <Button
              isLoading={isSubmitting}
              type='submit'
              text='ENVIAR'
              mt='.5rem'
            />
          </FormWrapper>
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
