import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '../services/firebaseAdmin';

export async function redirectToConversationsPage(
  ctx: GetServerSidePropsContext
) {
  const cookies = nookies.get(ctx);

  if (!cookies.token) return;

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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
