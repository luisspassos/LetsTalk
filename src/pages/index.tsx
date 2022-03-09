import { Img, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Header } from '../components/Header';
import { FormWrapper } from '../components/Form/FormWrapper';
import { LoginButtonWithGoogle } from '../components/Form/LoginButtonWithGoogle';
import { DividerOr } from '../components/Form/DividerOr';
import { Input } from '../components/Form/Input';
import NextLink from 'next/link';

const Login: NextPage = () => {
  return (
    <>
      <Header />
      <Img h='350px' src='/images/man_entering_img.svg' alt='Ilustração de login' />

      <FormWrapper>
        <LoginButtonWithGoogle />
        <DividerOr />
        <Input type='email' id='email' label='Email' name='email' />
        <Input type='password' id='password' label='Senha' name='password' />
        <NextLink href='/esqueci-minha-senha' passHref>
          <Link>Esqueci minha senha</Link>
        </NextLink>
      </FormWrapper>
    </>
  );
};

export default Login;
