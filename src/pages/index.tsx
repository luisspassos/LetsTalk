import { Flex, Img, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { DividerOr } from '../components/Form/DividerOr';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { LoginButtonWithGoogle } from '../components/Form/LoginButtonWithGoogle';
import { Header } from '../components/Header';
import NextLink from 'next/link';
import { Button } from '../components/Form/Button';

const Login: NextPage = () => {
  return (
    <Flex h='100vh' direction='column'>
      <Header />
      <Flex px='10' gap='10' align='center' flex='1'>
        <Img h='350px' src='/images/man_entering_img.svg' alt='Ilustração de login' />
        <FormWrapper>
          <LoginButtonWithGoogle />
          <DividerOr />
          <Input type='email' id='email' label='Email' name='email' />
          <Input type='password' id='password' label='Senha' name='password' />
          <NextLink href='/esqueci-minha-senha' passHref>
            <Link>Esqueci minha senha</Link>
          </NextLink>
          <Button text='Entrar' />
        </FormWrapper>
      </Flex>
    </Flex>
  );
};

export default Login;
