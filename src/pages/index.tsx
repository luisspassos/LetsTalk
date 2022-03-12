import { Flex, Img, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { DividerOr } from '../components/Form/DividerOr';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { LoginButtonWithGoogle } from '../components/Form/LoginButtonWithGoogle';
import { Header } from '../components/Header';
import NextLink from 'next/link';
import { Button } from '../components/Form/Button';
import { RegistrationLink } from '../components/Form/RegistrationLink';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Flex mx='auto' maxW={1400} h='100vh' direction='column'>
      <Header />
      <Flex px='10' gap='90px' align='center' flex='1' justify='center'>
        <Img
          d={{ base: 'none', xl: 'block' }}
          h='350px'
          src='/images/man_entering_img.svg'
          alt='Ilustração de login'
        />
        <FormWrapper onSubmit={onSubmit}>
          <LoginButtonWithGoogle />
          <DividerOr />
          <Stack spacing={2}>
            <Input
              type='email'
              id='email'
              label='Email'
              placeholder='Email...'
              {...register('email')}
            />
            <Input
              type='password'
              id='password'
              label='Senha'
              placeholder='Senha...'
              {...register('password')}
            />
          </Stack>
          <NextLink href='/esqueci-minha-senha' passHref>
            <Link
              mt='6px'
              mb='12px'
              fontSize='15px'
              color='gray.400'
              d='inline-block'
            >
              Esqueci minha senha
            </Link>
          </NextLink>
          <Button type='submit' text='ENTRAR' />

          <RegistrationLink />
        </FormWrapper>
      </Flex>
    </Flex>
  );
};

export default Login;
