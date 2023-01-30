import { Tooltip as TooltipComponent, TooltipProps } from 'components/Tooltip';

export function Tooltip({ children, ...rest }: TooltipProps) {
  return (
    <TooltipComponent hasArrow={false} placement='top' {...rest}>
      {children}
    </TooltipComponent>
  );
}
