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

export function Tooltip({ children, label, ariaLabel, ...rest }: TooltipProps) {
  return (
    <ChakraTooltip
      maxW='auto'
      fontSize='15px'
      hasArrow
      placement='right'
      label={label}
      aria-label={ariaLabel}
      bgColor='gray.700'
      color='gray.50'
      {...rest}
    >
      {children}
    </ChakraTooltip>
  );
}
