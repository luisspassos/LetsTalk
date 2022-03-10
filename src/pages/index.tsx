import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Header } from "../components/Header";

const Login: NextPage = () => {
  return (
    // <>
    //   <Header />
    //   <Flex px="10" gap="10" align="center">
    //     <Img h="350px" src="/images/man_entering_img.svg" alt="Ilustração de login" />
    //     <FormWrapper>
    //       <LoginButtonWithGoogle />
    //       <DividerOr />
    //       <Input type="email" id="email" label="Email" name="email" />
    //       <Input type="password" id="password" label="Senha" name="password" />
    //       <NextLink href="/esqueci-minha-senha" passHref>
    //         <Link>Esqueci minha senha</Link>
    //       </NextLink>
    //       <Button text="Entrar" />
    //     </FormWrapper>
    //   </Flex>
    // </>
    <Flex h="100vh" direction="column">
      <Header />
      <Box flex="1" bg="green.200"></Box>
    </Flex>
  );
};

export default Login;
