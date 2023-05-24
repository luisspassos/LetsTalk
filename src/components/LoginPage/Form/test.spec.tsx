// jest.mock('contexts/AuthContext', () => {
//   return {
//     ...jest.requireActual('contexts/AuthContext'),
//     signInWithEmailAndPassword: jest.fn(),
//   };
// });

// type FillOutFormAndPressTheButtonParams = {
//   email
// }

// async function fillOutFormAndPressTheButton({ email, password }) {
//   const emailInput = screen.getByLabelText('Email');
//   const passwordInput = screen.getByLabelText('Password');
//   const enterButton = getButton('ENTRAR');
// }

async () => {
  const a = await createFillOutFormAndPressTheButton(
    [
      {
        fallbackText: 'email@gmail.com',
        label: 'email',
      },
      {
        fallbackText: 'asdasda',
        label: 'password',
      },
    ],
    'nao sie'
  );

  a();
};

// testFormWithEmail({
//   name: 'Login',
//   Component: Form,
//   fillOutFormAndPressTheButton,
// });
