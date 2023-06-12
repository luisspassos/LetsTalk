import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '../services/firebaseAdmin';

export async function redirectToConversationsPageIfThereIsUser(
  ctx: GetServerSidePropsContext
) {
  const props = {
    props: {},
    redirect: undefined,
  };

  const cookies = nookies.get(ctx);

  function ObjectIsEmpty(obj: object) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  try {
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    if (
      user.email_verified ||
      (user.firebase.sign_in_provider === 'google.com' &&
        ObjectIsEmpty(ctx.query))
    ) {
      return {
        redirect: {
          destination: '/conversas',
          permanent: false,
        },
      };
    }

    return props;
  } catch (err) {
    console.error(err);

    return props;
  }
}
