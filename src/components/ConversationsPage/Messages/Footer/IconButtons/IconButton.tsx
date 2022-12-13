import {
  IconButton as ChakraIconButton,
  Icon as ChakraIcon,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Tooltip } from '../../../../Tooltip';

type IconButtonProps = {
  Icon: IconType;
} & ChakraIconButtonProps;

export function IconButton({
  'aria-label': ariaLabel,
  Icon,
  ...rest
}: IconButtonProps) {
  return (
    <Tooltip
      hasArrow={false}
      placement='top'
      ariaLabel={ariaLabel}
      label={ariaLabel}
    >
      <ChakraIconButton
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
