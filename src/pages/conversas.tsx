import { useAuth } from '../contexts/AuthContext';

export default function Conversations() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Conversations</h1>
      {user && <h1>{user.email}</h1>}
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   try {
//     const cookies = nookies.get(ctx);
//     const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

//     if (user) {
//       return {
//         props: {},
//       };
//     }
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.log(err);
//   }

//   return {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   };
// };
