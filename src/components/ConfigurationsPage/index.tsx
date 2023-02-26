import { Flex } from '@chakra-ui/react';
import { PageTitle } from '../PageTitle';
import { ProfileSettings } from './Box/ProfileSettings';
import { AccountSettings } from './Box/AccountSettings';

export function Configurations() {
  return (
    <>
      <PageTitle pageName='Configurações' />
      <Flex
        wrap='wrap'
        p='20px'
        flex='1'
        align='center'
        justify='center'
        // columnGap='min(5%, 80px)'
        columnGap='5rem'
        rowGap='30px'
        // rowGap='2rem'
        overflow='auto'
        h='100vh'
        fontSize='1rem'
      >
        <ProfileSettings />
        <AccountSettings />
      </Flex>
    </>
  );
}
