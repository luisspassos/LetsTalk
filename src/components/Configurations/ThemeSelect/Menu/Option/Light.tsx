import { useColorMode } from '@chakra-ui/react';
import { BiSun } from 'react-icons/bi';
import { Option } from '.';

export function Light() {
  const { setColorMode } = useColorMode();

  function handleChangeTheme() {
    setColorMode('light');
  }

  return <Option onClick={handleChangeTheme} text='Claro' icon={BiSun} />;
}
