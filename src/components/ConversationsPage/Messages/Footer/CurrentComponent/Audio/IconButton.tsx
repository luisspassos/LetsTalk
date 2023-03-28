import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';
import { Tooltip } from '../Tooltip';
import { IconButton as IconButtonComponent } from 'components/IconButton';

export type IconButtonProps = {
  icon: ChakraIconButtonProps['icon'];
} & ChakraIconButtonProps;

export function IconButton(props: IconButtonProps) {
  const { 'aria-label': ariaLabel } = props;

  return (
    <Tooltip label={ariaLabel} ariaLabel={ariaLabel}>
      <IconButtonComponent fontSize='27px' variant='ghost' {...props} />
    </Tooltip>
  );
}
