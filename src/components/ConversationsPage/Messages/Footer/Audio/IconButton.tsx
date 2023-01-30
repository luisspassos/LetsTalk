import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { Tooltip } from '../Tooltip';

type IconButtonProps = {
  icon: ChakraIconButtonProps['icon'];
} & ChakraIconButtonProps;

export function IconButton(props: IconButtonProps) {
  const { 'aria-label': ariaLabel } = props;

  return (
    <Tooltip label={ariaLabel} ariaLabel={ariaLabel}>
      <ChakraIconButton fontSize='27px' variant='ghost' {...props} />
    </Tooltip>
  );
}
