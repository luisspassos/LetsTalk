import { Stack } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { Button } from '../components/Form/Button';
import { CenterForm } from '../components/Form/CenterForm';
import { FormTitle } from '../components/Form/FormTitle';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';

export default function changePassword() {
  return (
    <CenterForm>
      <FormTitle mb='1rem' text='Trocar sua senha' />
      <FormWrapper>
        <Stack spacing='.3rem'>
          <Input
            id='newPassword'
            label='Nova senha'
            placeholder='Coloque sua nova senha...'
          />
          <Input
            id='confirmNewPassword'
            label='Confirme sua senha'
            placeholder='Confirme sua nova senha...'
          />
          <Button text='REDEFINIR' />
        </Stack>
      </FormWrapper>

      <BackLink text='Voltar' route='/' mt='1rem' />
    </CenterForm>
  );
}
