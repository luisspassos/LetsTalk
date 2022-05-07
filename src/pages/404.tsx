import { Flex, Heading, Image, useColorModeValue } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { PageTitle } from '../components/PageTitle';

export default function Custom404() {
  return (
    <>
      <PageTitle pageName='404' />
      <Flex h='100vh' align='center' justify='center' gap='50px' p='20px'>
        <Image
          w='602px'
          h='400px'
          src='/images/page_not_found.svg'
          alt='Pagína não encontrada'
          d={{ base: 'none', xl: 'block' }}
        />
        <Flex direction='column' gap='20px'>
          <Heading as='h1' color={useColorModeValue('blue.900', 'gray.50')}>
            Opss! Parece que esta
            <br /> página não existe...
          </Heading>
          <BackLink text='Voltar' route='/' />
        </Flex>
      </Flex>
    </>
  );
}
