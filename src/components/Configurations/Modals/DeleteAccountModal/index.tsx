import { Flex, Stack } from '@chakra-ui/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { DangerousActionIcon } from '../../../Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from '../../../Modal/DangerousAction/DangerousActionModalTitle';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WarningText } from './WarningText';
import { useDeleteAccountModal } from '../../../../contexts/Modal/DeleteAccountModalContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { PasswordInput } from './PasswordInput';
import { Buttons } from './Buttons';

export type PasswordFormData = {
  password: string;
};

const PasswordFormSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória'),
});

export function DeleteAccountModal() {
  const { isOpen, onClose } = useDeleteAccountModal();
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
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center'>
        <Stack spacing='5px' align='center' mb='14px'>
          <DangerousActionIcon Icon={RiDeleteBin2Line} />
          <DangerousActionModalTitle text='Você deseja excluir sua conta?' />
        </Stack>
        {!isLoggedInWithGoogle && (
          <PasswordInput error={errors.password} register={register} />
        )}

        <Buttons
          setError={setError}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <WarningText />
      </Flex>
    </ModalWrapper>
  );
}
