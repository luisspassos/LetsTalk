import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../services/firebase';
import { applyActionCode } from 'firebase/auth';
import { toast } from '../utils/Toasts/toast';
import { redirectToConversationsPageIfThereIsUser } from '../utils/redirectToConversationsPageIfThereIsUser';
import { PageTitle } from '../components/PageTitle';
import { Content } from 'components/LoginPage';

type RouterQuery = {
  error: string;
  success: string;
  oobCode: string;
  mode: string;
};

export const toasts = {
  emailVerification: {
    error: () =>
      toast({
        status: 'error',
        title: 'Ocorreu um erro ao verificar o email',
        description:
          'Tente reenviar o email novamente logando com seu email e senha.',
      }),
    success: () =>
      toast({
        status: 'success',
        title: 'Email verificado com sucesso',
      }),
  },
  passwordReset: {
    error: () =>
      toast({
        status: 'error',
        title: 'Ocorreu um erro ao validar o código de redefinição de senha',
        description: 'Tente novamente.',
      }),
    success: () =>
      toast({
        status: 'success',
        title: 'Senha atualizada com sucesso',
      }),
  },
  recoverEmail: {
    error: async () => {
      const { toast } = await import('../utils/Toasts/toast');

      toast({
        status: 'error',
        title: 'Ocorreu um erro ao tentar recuperar seu email',
      });
    },
    success: async () => {
      const { toast } = await import('../utils/Toasts/toast');

      toast({
        status: 'success',
        title: 'Seu email foi recuperado com sucesso!',
      });
    },
  },
};

const Login = () => {
  const router = useRouter();

  const {
    error: errorParam,
    success: successParam,
    mode: action,
    oobCode: actionCode,
  } = router.query as RouterQuery;

  useEffect(() => {
    function clearUrl() {
      if (errorParam || successParam || action) router.replace('/');
    }

    clearUrl();
  }, [action, errorParam, router, successParam]);

  useEffect(() => {
    function handleActions() {
      if (action === 'verifyEmail') {
        (async () => {
          try {
            await applyActionCode(auth, actionCode);
            toasts.emailVerification.success();
          } catch (err) {
            toasts.emailVerification.error();
          }
        })();
      }

      if (action === 'recoverEmail') {
        (async () => {
          const { checkActionCode } = await import('firebase/auth');

          try {
            await checkActionCode(auth, actionCode);
            await applyActionCode(auth, actionCode);
            toasts.recoverEmail.success();
          } catch {
            toasts.recoverEmail.error();
          }
        })();
      }
    }

    handleActions();
  }, [action, actionCode]);

  useEffect(() => {
    function handleStatusParams() {
      if (errorParam === 'passwordreset') {
        toasts.passwordReset.error();
      }

      if (successParam === 'passwordreset') {
        toasts.passwordReset.success();
      }
    }

    handleStatusParams();
  }, [errorParam, successParam]);

  return (
    <>
      <PageTitle pageName='Login' />
      <Content />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  async function handleRedirection() {
    const { mode: action, oobCode } = ctx.query;

    const redirectionToConversationsOrNot =
      await redirectToConversationsPageIfThereIsUser(ctx);

    if (redirectionToConversationsOrNot.redirect) {
      return redirectionToConversationsOrNot;
    }

    if (action === 'resetPassword') {
      return {
        redirect: {
          destination: `/trocar-senha/?oobCode=${oobCode}`,
          permanent: false,
        },
      };
    }
  }

  const redirection = await handleRedirection();

  if (redirection) return redirection;

  return {
    props: {},
  };
};

export default Login;
