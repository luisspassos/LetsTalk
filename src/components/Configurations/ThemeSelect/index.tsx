import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Button,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiChevronDown, BiMoon, BiSun } from 'react-icons/bi';
import { Option } from './Option';

export function ThemeSelect() {
  const { colorMode, setColorMode } = useColorMode();

  function handleChangeThemeToLight() {
    setColorMode('light');
  }

  function handleChangeThemeToDark() {
    setColorMode('dark');
  }

  return (
    <HStack mt={['9px', '12px', '15px']}>
      <Text fontSize={['15px', '15.5px', '16px']}>Tema </Text>
      <Menu>
        <MenuButton
          w={['134px', '139px', '144px']}
          h={['30px', '35px', '40px']}
          px={['10px', '13px', '16px']}
          bgColor={useColorModeValue(undefined, 'blackAlpha.300')}
          _hover={{
            bgColor: useColorModeValue(undefined, 'blackAlpha.400'),
          }}
          _active={{
            bgColor: useColorModeValue('gray.100', 'blackAlpha.500'),
          }}
          as={Button}
          rightIcon={<Icon as={BiChevronDown} />}
        >
          <HStack>
            <Icon as={colorMode === 'light' ? BiSun : BiMoon} />
            <Text fontSize={['14px', '15px', '16px']}>
              {colorMode === 'light' ? 'Claro' : 'Escuro'}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList minW={0} w={['184px', '204px', '224px']}>
          <Option
            onClick={handleChangeThemeToLight}
            text='Claro'
            icon={BiSun}
          />
          <Option
            onClick={handleChangeThemeToDark}
            text='Escuro'
            icon={BiMoon}
          />
        </MenuList>
      </Menu>
    </HStack>
  );
}
