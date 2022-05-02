import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import * as yup from 'yup';
import { regexs } from '../../../utils/regexs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type ChangeEmailFormData = {
  name: string;
};

const ChangeEmailFormSchema = yup.object().shape({
  contactName: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
});

export function ChangeEmailModal() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailFormData>({
    resolver: yupResolver(ChangeEmailFormSchema),
  });

  return (
    <ModalWrapper isOpen={false} onClose={() => {}} modalTitle='Trocar email'>
      <ModalFormControl>
        <ModalInput
          id='email'
          label='Novo Email'
          placeholder='Digite seu novo email'
          error={errors.name}
          register={register}
          type='email'
        />
        <Buttons confirmButtonText='Trocar' />
      </ModalFormControl>
    </ModalWrapper>
  );
}
