import { IconType } from 'react-icons';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { Tooltip } from '../Tooltip';

type IconButtonProps = {
  label: string;
  Icon: IconType;
  anyFunction: () => void;
  isFocused?: boolean;
};

export function IconButton({
  label,
  Icon,
  anyFunction,
  isFocused,
}: IconButtonProps) {
  return (
    <Tooltip ariaLabel={label} label={label} aria-label={label}>
      <ChakraIconButton
        bg={isFocused ? 'whiteAlpha.400' : undefined}
        w='40px'
        fontSize='30px'
        d='flex'
        justifyContent='center'
        alignItems='center'
        color='white'
        variant='ghost'
        _hover={{
          bg: 'whiteAlpha.400',
        }}
        _active={{
          bg: 'whiteAlpha.500',
        }}
        aria-label={label}
        icon={<Icon />}
        onClick={anyFunction}
      />
    </Tooltip>
  );
}
