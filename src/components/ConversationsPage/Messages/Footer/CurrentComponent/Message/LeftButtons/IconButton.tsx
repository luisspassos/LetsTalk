import {
  Icon as ChakraIcon,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Tooltip } from '../../Tooltip';
import { IconButton as IconButtonComponent } from 'components/IconButton';

type IconButtonProps = {
  Icon: IconType;
  label?: string;
} & ChakraIconButtonProps;

export function IconButton({
  'aria-label': ariaLabel,
  Icon,
  label = ariaLabel,
  ...rest
}: IconButtonProps) {
  return (
    <Tooltip ariaLabel={ariaLabel} label={label}>
      <IconButtonComponent
        w={['29px', '32px', '35px']}
        h={['29px', '32px', '35px']}
        minWidth={0}
        fontSize={['21px', '23px', '25px']}
        variant='ghost'
        aria-label={ariaLabel}
        icon={<ChakraIcon as={Icon} />}
        {...rest}
      />
    </Tooltip>
  );
}
