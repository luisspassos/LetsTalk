import { Flex, Heading, Image } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';

export default function Custom404() {
  return (
    <Flex h='100vh' align='center' justify='center' gap='50px' p='20px'>
      <Image
        w='602px'
        h='400px'
        src='/images/page_not_found.svg'
        alt='Pagína não encontrada'
        d={{ base: 'none', xl: 'block' }}
      />
      <Flex direction='column' gap='20px'>
        <Heading as='h1' color='blue.900'>
          Opss! Parece que esta
          <br /> página não existe...
        </Heading>
        <BackLink text='Voltar' route='/' />
      </Flex>
    </Flex>
  );
}
