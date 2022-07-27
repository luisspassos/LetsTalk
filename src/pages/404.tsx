import { Flex, Heading, Img, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BackLink } from '../components/BackLink';
import { PageTitle } from '../components/PageTitle';
import Graphemer from 'graphemer';
import { parse as twemojiParse } from 'twemoji-parser';

const graphemer = new Graphemer();

export default function Custom404() {
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://emoji-api.com/emojis?access_key=2b410828de16e114075221df8478aea8e1948c9b'
      );

      const data = await response.json();

      const emojis = data
        .map((el) => twemojiParse(el.character))
        .filter((e) => e.length > 1);

      console.log(emojis);
    })();
  }, []);

  return (
    <>
      <PageTitle pageName='404' />
      <Flex h='100vh' align='center' justify='center' gap='50px' p='20px'>
        <Img
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
