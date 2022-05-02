import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import * as yup from 'yup';
import { regexs } from '../../../utils/regexs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRenameUsernameModal } from '../../../contexts/Modal/RenameUsernameModalContext';

type RenameUsernameFormData = {
  name: string;
};

const RenameUsernameFormSchema = yup.object().shape({
  contactName: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
});

export function RenameUsernameModal() {
  const { isOpen, onClose } = useRenameUsernameModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RenameUsernameFormData>({
    resolver: yupResolver(RenameUsernameFormSchema),
  });

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='Trocar nome de usuário'
    >
      <ModalFormControl>
        <ModalInput
          id='name'
          label='Nome'
          placeholder='Coloque seu novo nome'
          error={errors.name}
          register={register}
        />
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
