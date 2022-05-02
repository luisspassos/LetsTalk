import { Icon as ChakraIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type DangerousActionIconProps = {
  Icon: IconType;
};

export function DangerousActionIcon({ Icon }: DangerousActionIconProps) {
  return (
    <ChakraIcon color='red.600' fontSize={['6xl', null, '7xl']} as={Icon} />
  );
}
