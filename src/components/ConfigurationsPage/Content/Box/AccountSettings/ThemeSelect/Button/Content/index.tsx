import { HStack } from '@chakra-ui/react';
import { Icon } from './Icon';
import { Text } from './Text';

export function Content() {
  return (
    <HStack spacing='.7em' wrap='wrap' minW='0'>
      <Icon />
      <Text />
    </HStack>
  );
}
