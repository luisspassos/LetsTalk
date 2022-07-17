import {
  IconButton,
  Icon as ChakraIcon,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Tooltip } from '../../../../Tooltip';

type IconButtonProps = Omit<ChakraIconButtonProps, 'aria-label'>;

type InputIconButtonProps = {
  ariaLabel: string;
  Icon: IconType;
} & IconButtonProps;

export function InputIconButton({
  ariaLabel,
  Icon,
  ...rest
}: InputIconButtonProps) {
  return (
    <Tooltip
      hasArrow={false}
      placement='top'
      ariaLabel={ariaLabel}
      label={ariaLabel}
    >
      <IconButton
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
