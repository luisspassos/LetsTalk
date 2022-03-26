import { Center } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { Button } from '../components/Form/Button';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { FormTitle } from '../components/FormTItle';

export default function IForgotMyPassword() {
  return (
    <Center p='2rem' h='100vh' flexDir='column'>
      <FormTitle mb='1rem' text='Envie seu email para recuperar sua senha' />
      <FormWrapper>
        <Input id='email' label='Email' placeholder='Coloque seu email' />
        <Button text='ENVIAR' mt='.5rem' />
      </FormWrapper>
      <BackLink text='Voltar' route='/' mt='1rem' />
    </Center>
  );
}
