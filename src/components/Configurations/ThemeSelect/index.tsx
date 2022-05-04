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
    <HStack mt={['9px', '12px', '15px']}>
      <Text fontSize={['15px', '15.5px', '16px']}>Tema: </Text>
      <Menu>
        <MenuButton
          w={['114px', '119px', '124px']}
          h={['30px', '35px', '40px']}
          px={['10px', '13px', '16px']}
          _active={{
            bgColor: 'gray.100',
          }}
          as={Button}
          rightIcon={<Icon as={BiChevronDown} />}
        >
          <HStack>
            <Icon as={BiSun} />
            <Text fontSize={['14px', '15px', '16px']}>Claro</Text>
          </HStack>
        </MenuButton>
        <MenuList minW={0} w={['184px', '204px', '224px']}>
          <Option text='Claro' icon={BiSun} />
          <Option text='Escuro' icon={BiMoon} />
        </MenuList>
      </Menu>
    </HStack>
  );
}
