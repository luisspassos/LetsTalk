import { Flex } from '@chakra-ui/react';
import { Description } from 'components/404/Description';
import { Img } from 'components/404/Img';
import { BackLink } from 'components/BackLink';
import { PageTitle } from '../components/PageTitle';

export default function Custom404() {
  return (
    <>
      <PageTitle pageName='404' />
      <Flex h='100vh' align='center' justify='center' gap='50px' p='20px'>
        <Img />
        <Flex direction='column' gap='20px'>
          <Description />
          <BackLink text='Voltar' route='/' />
        </Flex>
      </Flex>
    </>
  );
}
