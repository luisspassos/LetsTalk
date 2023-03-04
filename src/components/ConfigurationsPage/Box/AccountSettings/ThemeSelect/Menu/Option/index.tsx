import { HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type OptionProps = {
  icon: IconType;
  text: string;
  onClick: () => void;
};

export function Option({ icon, text, onClick }: OptionProps) {
  return (
    <MenuItem onClick={onClick}>
      <HStack>
        <Icon as={icon} />
        <Text fontSize='.8em'>{text}</Text>
      </HStack>
    </MenuItem>
  );
}
