import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '../../../../../contexts/AuthContext';
import { Buttons } from './Buttons';
import { PasswordInput } from './PasswordInput';

export type PasswordFormData = {
  password: string;
};

const PasswordFormSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória'),
});

export function Content() {
  const { isLoggedInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(PasswordFormSchema),
  });

  return (
    <>
      {!isLoggedInWithGoogle && (
        <PasswordInput error={errors.password} register={register} />
      )}

      <Buttons
        setError={setError}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
