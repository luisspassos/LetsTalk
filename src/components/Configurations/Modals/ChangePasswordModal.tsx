import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import * as yup from 'yup';
import { regexs } from '../../../utils/regexs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { useChangePasswordModal } from '../../../contexts/Modal/ChangePasswordModalContext';

type ChangePasswordFormData = {
  name: string;
};

const ChangePasswordFormSchema = yup.object().shape({
  contactName: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
});

export function ChangePasswordModal() {
  const { isOpen, onClose } = useChangePasswordModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(ChangePasswordFormSchema),
  });

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} modalTitle='Trocar senha'>
      <ModalFormControl>
        <Stack spacing='12px'>
          <ModalInput
            id='password'
            label='Novo Senha'
            placeholder='Digite sua nova senha'
            error={errors.name}
            register={register}
            type='password'
          />
          <ModalInput
            id='confirmPassword'
            label='Confirme sua senha'
            placeholder='Confirme sua nova senha'
            error={errors.name}
            register={register}
            type='password'
          />
        </Stack>
        <Buttons
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonText='Trocar'
        />
      </ModalFormControl>
    </ModalWrapper>
  );
}
