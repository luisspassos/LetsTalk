import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export function RegistrationLink() {
  return (
    <Text align='center' mt='10px'>
      Não tem uma conta?{" "}
      <NextLink href='/cadastro' passHref>
        <Link>Cadastre-se!</Link>
      </NextLink>
    </Text>
  );
}
