import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
  label: string;
} & ChakraTooltipProps;

export function Tooltip({ children, label, ...rest }: TooltipProps) {
  return (
    <ChakraTooltip
      fontSize='15px'
      hasArrow
      placement='right'
      label={label}
      aria-label={label}
      {...rest}
    >
      {children}
    </ChakraTooltip>
  );
}
