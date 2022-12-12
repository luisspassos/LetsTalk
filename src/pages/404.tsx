import { Flex } from '@chakra-ui/react';
import { Img } from 'components/404/Img';
import { Text } from 'components/404/Text';
import { BackLink } from 'components/BackLink';
import { PageTitle } from '../components/PageTitle';

export default function Custom404() {
  return (
    <>
      <PageTitle pageName='404' />
      <Flex h='100vh' align='center' justify='center' gap='50px' p='20px'>
        <Img />
        <Flex direction='column' gap='20px'>
          <Text />
          <BackLink text='Voltar' route='/' />
        </Flex>
      </Flex>
    </>
  );
}
