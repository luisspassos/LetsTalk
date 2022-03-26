import { BackLink } from '../components/BackLink';
import { Button } from '../components/Form/Button';
import { CenterForm } from '../components/Form/CenterForm';
import { FormTitle } from '../components/Form/FormTitle';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';

export default function changePassword() {
  return (
    <CenterForm>
      <FormTitle text='Trocar sua senha' />
      <FormWrapper>
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
      </FormWrapper>

      <BackLink text='Voltar' route='/' />
    </CenterForm>
  );
}
