import { useColorMode } from '@chakra-ui/react';
import { BiMoon } from 'react-icons/bi';
import { Option } from '.';

export function Dark() {
  const { setColorMode } = useColorMode();

  function handleChangeTheme() {
    setColorMode('dark');
  }

  return <Option onClick={handleChangeTheme} text='Escuro' icon={BiMoon} />;
}
