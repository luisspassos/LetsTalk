import { HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type OptionProps = {
  icon: IconType;
  text: string;
};

export function Option({ icon, text }: OptionProps) {
  return (
    <MenuItem>
      <HStack>
        <Icon as={icon} />
        <Text fontSize={['14px', '15px', '16px']}>{text}</Text>
      </HStack>
    </MenuItem>
  );
}
