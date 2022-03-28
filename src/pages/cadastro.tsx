import { Header } from '../components/Header';
import { Flex, Stack, Heading, Text } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

export default function Register() {
  return (
    <Flex mx='auto' maxW={1400} h='100vh' direction='column'>
      <Header />
      <Flex px='10' gap='150px' align='center' flex='1' justify='center'>
        <Stack color='blue.900'>
          <Heading as='h1'>
            Mais de 200 mil usuários já
            <br /> estão conversando!
          </Heading>
          <Text fontSize='1.4rem'>
            Junte-se e converse com outras
            <br /> pessoas!
          </Text>
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
    </Flex>
  );
}
