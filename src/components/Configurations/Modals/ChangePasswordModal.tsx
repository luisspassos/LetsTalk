import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import * as yup from 'yup';
import { regexs } from '../../../utils/regexs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';

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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(ChangePasswordFormSchema),
  });

  return (
    <ModalWrapper isOpen={false} onClose={() => {}} modalTitle='Trocar senha'>
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
        <Buttons confirmButtonText='Trocar' />
      </ModalFormControl>
    </ModalWrapper>
  );
}
