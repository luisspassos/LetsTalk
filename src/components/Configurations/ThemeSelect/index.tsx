import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import { BiChevronDown, BiMoon, BiSun } from 'react-icons/bi';
import { Option } from './Option';

export function ThemeSelect() {
  return (
    <HStack>
      <Text>Tema: </Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<Icon as={BiChevronDown} />}>
          Claro
        </MenuButton>
        <MenuList>
          <Option text='Claro' icon={BiSun} />
          <Option text='Escuro' icon={BiMoon} />
        </MenuList>
      </Menu>
    </HStack>
  );
}
