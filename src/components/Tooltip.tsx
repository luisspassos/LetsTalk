import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
  label: ReactElement | string;
  ariaLabel: string;
} & ChakraTooltipProps;

export function Tooltip({ children, label, ...rest }: TooltipProps) {
  return (
    <ChakraTooltip
      maxW='auto'
      fontSize='15px'
      hasArrow
      placement='right'
      label={label}
      aria-label={label.toString()}
      {...rest}
    >
      {children}
    </ChakraTooltip>
  );
}
