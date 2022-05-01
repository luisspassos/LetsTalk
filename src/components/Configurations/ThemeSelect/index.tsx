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
    <HStack mt='15px'>
      <Text>Tema: </Text>
      <Menu isLazy>
        <MenuButton
          _active={{
            bgColor: 'gray.100',
          }}
          as={Button}
          rightIcon={<Icon as={BiChevronDown} />}
        >
          <HStack>
            <Icon as={BiSun} />
            <Text>Claro</Text>
          </HStack>
        </MenuButton>
        <MenuList>
          <Option text='Claro' icon={BiSun} />
          <Option text='Escuro' icon={BiMoon} />
        </MenuList>
      </Menu>
    </HStack>
  );
}
