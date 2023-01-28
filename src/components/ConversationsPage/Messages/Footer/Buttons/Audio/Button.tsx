import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { Tooltip } from '../../Tooltip';

type ButtonProps = IconButtonProps;

export function Button(props: ButtonProps) {
  const { 'aria-label': ariaLabel } = props;

  return (
    <Tooltip label={ariaLabel} ariaLabel={ariaLabel}>
      <IconButton fontSize='27px' variant='ghost' {...props} />
    </Tooltip>
  );
}
