import { Flex, useMediaQuery } from '@chakra-ui/react';
import { PageTitle } from '../PageTitle';
import { ProfileSettings } from './Box/ProfileSettings';
import { AccountSettings } from './Box/AccountSettings';

export function Configurations() {
  const [isLargerThan41] = useMediaQuery('(min-width: 50em)');

  return (
    <>
      <PageTitle pageName='Configurações' />
      <Flex
        direction={isLargerThan41 ? 'row' : 'column'}
        p='20px'
        flex='1'
        align='center'
        justify='center'
        columnGap='6%'
        rowGap='2em'
        overflow='auto'
        minH='100vh'
        fontSize='calc(0.9375rem + 0.390625vw)'
      >
        <ProfileSettings />
        <AccountSettings />
      </Flex>
    </>
  );
}
