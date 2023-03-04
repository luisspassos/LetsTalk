import { Menu as MenuWrapper, HStack } from '@chakra-ui/react';
import { Button } from './Button';
import { Label } from './Label';
import { Menu } from './Menu';

export function ThemeSelect() {
  return (
    <HStack mt='.75em' wrap='wrap' spacing='0'>
      <Label />
      <MenuWrapper>
        <Button />
        <Menu />
      </MenuWrapper>
    </HStack>
  );
}
