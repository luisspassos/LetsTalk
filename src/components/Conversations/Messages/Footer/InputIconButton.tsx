import {
  IconButton,
  InputRightElement,
  Icon as ChakraIcon,
  InputElementProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Tooltip } from '../../../Tooltip';

type InputIconButtonProps = {
  ariaLabel: string;
  Icon: IconType;
} & InputElementProps;

export function InputIconButton({
  ariaLabel,
  Icon,
  ...rest
}: InputIconButtonProps) {
  return (
    <Tooltip placement='top' ariaLabel={ariaLabel} label={ariaLabel}>
      <InputRightElement {...rest} h='100%'>
        <IconButton
          fontSize='25px'
          variant='ghost'
          aria-label={ariaLabel}
          icon={<ChakraIcon as={Icon} />}
        />
      </InputRightElement>
    </Tooltip>
  );
}
