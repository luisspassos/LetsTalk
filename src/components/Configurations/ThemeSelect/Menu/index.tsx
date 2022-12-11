import { forwardRef, MenuList } from '@chakra-ui/react';
import { Dark } from './Option/Dark';
import { Light } from './Option/Light';

export const Menu = forwardRef((props, ref) => {
  return (
    <MenuList {...props} ref={ref} minW={0} w={['184px', '204px', '224px']}>
      <Light />
      <Dark />
    </MenuList>
  );
});
