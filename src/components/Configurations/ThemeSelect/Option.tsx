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
        <Text>{text}</Text>
      </HStack>
    </MenuItem>
  );
}
