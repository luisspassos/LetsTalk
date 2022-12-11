import { Menu as MenuWrapper, HStack } from '@chakra-ui/react';
import { Button } from './Button';
import { Label } from './Label';
import { Menu } from './Menu';

export function ThemeSelect() {
  return (
    <HStack mt={['9px', '12px', '15px']}>
      <Label />
      <MenuWrapper>
        <Button />
        <Menu />
      </MenuWrapper>
    </HStack>
  );
}
