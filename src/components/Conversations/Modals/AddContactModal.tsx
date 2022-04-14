import { FormControl } from '@chakra-ui/react';
import { Input } from '../../Form/Input';
import { Buttons } from '../../Modal/Buttons';
import { ModalWrapper } from '../../Modal/ModalWrapper';

export function AddContactModal() {
  return (
    <ModalWrapper modalTitle='Adicionar contato'>
      <FormControl
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Input
          id='username'
          label='Usuário'
          inputProps={{
            placeholder: 'Insira um usuário, exemplo: usuario#1234',
            h: '45px',
            borderColor: 'blueAlpha.900',
          }}
          labelProps={{
            color: 'gray.900',
            opacity: 1,
            fontSize: '16px',
          }}
          helperText='O nome de usuário com ID pode ser encontrado nas configurações ou
            clicando na foto na barra ao lado.'
        />
        <Buttons confirmButtonText='Adicionar' />
      </FormControl>
    </ModalWrapper>
  );
}
