import { BackLink } from '../components/BackLink';
import { CenterForm } from '../components/Form/CenterForm';
import { GetServerSideProps } from 'next';
import { verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../services/firebase';
import { PageTitle } from '../components/PageTitle';
import { Title } from 'components/ChangePasswordPage/Form/Title';
import { Form } from 'components/ChangePasswordPage/Form';

export type ActionCode = string;

type ChangePasswordProps = {
  actionCode: ActionCode;
};

export default function ChangePassword({ actionCode }: ChangePasswordProps) {
  return (
    <>
      <PageTitle pageName='Trocar senha' />
      <CenterForm>
        <Title />
        <Form actionCode={actionCode} />

        <BackLink text='Voltar' route='/' mt='1rem' />
      </CenterForm>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const actionCode = query.oobCode as string;

  try {
    await verifyPasswordResetCode(auth, actionCode);
    return {
      props: {
        actionCode: actionCode,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/?error=passwordreset',
        permanent: false,
      },
    };
  }
};
