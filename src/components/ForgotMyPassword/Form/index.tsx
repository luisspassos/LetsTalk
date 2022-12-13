import { FormWrapper } from 'components/Form/FormWrapper';

export function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: yupResolver(emailFormSchema),
  });

  const { sendEmailToRecoverPassword } = useAuth();

  const handleSendEmail = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          await sendEmailToRecoverPassword(data);

          successToastWhenSendingToEmailToChangePassword();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const errors: FormFirebaseError = {
              'auth/user-not-found': {
                type: 'email',
                message: 'Este usuário não existe',
              },
              'auth/too-many-requests': {
                type: 'email',
                message: 'Tente novamente mais tarde',
              },
            };

            const error = errors[err.code];

            if (!error) {
              const { unknownErrorToast } = await import(
                '../utils/Toasts/unknownErrorToast'
              );
              unknownErrorToast();
            } else {
              setError(error.type, {
                message: error.message,
              });
            }
          }
        }
      }),
    [handleSubmit, sendEmailToRecoverPassword, setError]
  );

  return <FormWrapper onSubmit={handleSendEmail}></FormWrapper>;
}
