import { Header } from '../components/Header';
import { Flex, Stack, Heading, Text } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

export default function Register() {
  return (
    <>
      <Header />
      <Flex>
        <Stack color='blue.900'>
          <Heading as='h1'>
            Mais de 200 mil usuários já estão conversando!
          </Heading>
          <Text>Junte-se e converse com outras pessoas!</Text>
          <BackLink text='Fazer login' route='/' />
        </Stack>
        <FormWrapper>
          <Input label='Email' id='email' type='email' placeholder='Email...' />
          <Input label='Nome' id='username' placeholder='Nome...' />
          <Input
            label='Senha'
            id='password'
            type='password'
            placeholder='Senha...'
          />
          <Input
            label='Confirmar senha'
            id='confirmPassword'
            type='password'
            placeholder='Confirme sua senha...'
          />
          <Button text='CADASTRAR' type='submit' />
        </FormWrapper>
      </Flex>
    </>
  );
}
