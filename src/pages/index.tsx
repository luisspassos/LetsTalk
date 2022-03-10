import { Flex, Img, Link, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { DividerOr } from "../components/Form/DividerOr";
import { FormWrapper } from "../components/Form/FormWrapper";
import { Input } from "../components/Form/Input";
import { LoginButtonWithGoogle } from "../components/Form/LoginButtonWithGoogle";
import { Header } from "../components/Header";
import NextLink from "next/link";
import { Button } from "../components/Form/Button";
import { RegistrationLink } from "../components/Form/RegistrationLink";

const Login: NextPage = () => {
  return (
    <Flex h='100vh' direction='column'>
      <Header />
      <Flex px='10' gap='10' align='center' flex='1' justify='space-between'>
        <Img h='350px' src='/images/man_entering_img.svg' alt='Ilustração de login' />
        <FormWrapper>
          <LoginButtonWithGoogle />
          <DividerOr />
          <Stack spacing={2}>
            <Input type='email' id='email' label='Email' name='email' placeholder='Email...' />
            <Input type='password' id='password' label='Senha' name='password' placeholder='Senha...' />
          </Stack>
          <NextLink href='/esqueci-minha-senha' passHref>
            <Link mt='6px' mb='12px' fontSize='15px' color='gray.400' d='block'>
              Esqueci minha senha
            </Link>
          </NextLink>
          <Button text='ENTRAR' />

          <RegistrationLink />
        </FormWrapper>
      </Flex>
    </Flex>
  );
};

export default Login;
