import { useMediaQuery, Flex } from '@chakra-ui/react';
import { AccountSettings } from './Box/AccountSettings';
import { ProfileSettings } from './Box/ProfileSettings';

export function Content() {
  const [isLargerThan41] = useMediaQuery('(min-width: 50em)');

  return (
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
  );
}
