import { Flex } from '@chakra-ui/react';
import { AccountSettings } from './Box/AccountSettings';
import { ProfileSettings } from './Box/ProfileSettings';

export function Content() {
  return (
    <Flex
      p='20px'
      flex='1'
      align='center'
      justify='center'
      columnGap='6%'
      rowGap='2em'
      overflow='auto'
      minH='100vh'
      fontSize='calc(0.9375rem + 0.390625vw)'
      sx={{
        '&': {
          '@media (max-width: 50em)': {
            flexDirection: 'column',
          },
        },
      }}
    >
      <ProfileSettings />
      <AccountSettings />
    </Flex>
  );
}
