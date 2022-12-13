import { Tooltip as ToolTipComponent } from 'components/Tooltip';
import { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
};

export function Tooltip({ children }: TooltipProps) {
  return (
    <ToolTipComponent
      ariaLabel='Informações da conversa'
      label='Informações da conversa'
      placement='bottom-start'
    >
      {children}
    </ToolTipComponent>
  );
}
