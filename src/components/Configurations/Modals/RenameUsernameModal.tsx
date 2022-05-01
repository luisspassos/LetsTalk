import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';

type RenameUsernameFormData = {
  name: string;
};

export function RenameUsernameModal() {
  return (
    <ModalWrapper
      isOpen={true}
      onClose={() => {}}
      modalTitle='Trocar nome de usuário'
    >
      <ModalFormControl>
        <ModalInput
          id='name'
          label='Nome'
          placeholder='Coloque seu novo nome'
        />
        <Buttons confirmButtonText='Trocar' />
      </ModalFormControl>
    </ModalWrapper>
  );
}
