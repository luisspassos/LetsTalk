import { ReactNode } from 'react';
import { Tooltip as TooltipComponent } from 'components/Tooltip';
import { TooltipProps as ChakraTooltipProps } from '@chakra-ui/react';

type TooltipProps = {
  children: ReactNode;
} & ChakraTooltipProps;

export function Tooltip({ children, ...rest }: TooltipProps) {
  return (
    <TooltipComponent
      {...rest}
      bg='green.500'
      label='Copiado!'
      ariaLabel='Copiado!'
      placement='top'
    >
      {children}
    </TooltipComponent>
  );
}
