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
    <Tooltip
      hasArrow={false}
      placement='top'
      ariaLabel={ariaLabel}
      label={ariaLabel}
    >
      <InputRightElement {...rest} h='100%'>
        <IconButton
          w='35px'
          h='35px'
          minWidth={0}
          fontSize='25px'
          variant='ghost'
          aria-label={ariaLabel}
          icon={<ChakraIcon as={Icon} />}
        />
      </InputRightElement>
    </Tooltip>
  );
}
