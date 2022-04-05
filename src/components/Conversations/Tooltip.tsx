import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
  label: string;
  ariaLabel: string;
};

export function Tooltip({ ariaLabel, children, label }: TooltipProps) {
  return (
    <ChakraTooltip
      hasArrow
      placement='right'
      label={label}
      aria-label={ariaLabel}
    >
      {children}
    </ChakraTooltip>
  );
}
