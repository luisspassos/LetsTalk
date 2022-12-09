import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useConversationsTab } from '../../../../../contexts/ConversationsTabContext';
import { Tooltip as TooltipComponent } from '../../../../Tooltip';

type TooltipProps = {
  children: ReactNode;
};

type TooltipText = {
  text: string;
  show: boolean;
};

const tooltipMessages = {
  openTab: 'Abrir aba de conversas',
  closeTab: 'Esconder aba de conversas',
  help: 'Aperte aqui para alternar a aba de conversas. Para fechar este aviso, clique nele.',
};

let helpTooltipTimeout: NodeJS.Timeout;

export function Tooltip({ children }: TooltipProps) {
  const [tooltip, setTooltip] = useState<TooltipText>({
    text: tooltipMessages.closeTab,
    show: false,
  });

  const { isOpen } = useConversationsTab();

  useEffect(() => {
    function showTooltipMessage() {
      const removeHelpTooltip =
        localStorage.getItem('removeHelpTooltip') !== null;

      if (!isOpen && !removeHelpTooltip) {
        helpTooltipTimeout = setTimeout(() => {
          setTooltip({
            show: false,
            text: tooltipMessages.openTab,
          });
        }, 1000 * 5 /* 5 seconds */);

        setTooltip({
          text: tooltipMessages.help,
          show: true,
        });
        return;
      }

      if (!isOpen) {
        setTooltip((prevState) => ({
          ...prevState,
          text: tooltipMessages.openTab,
        }));
        return;
      }

      setTooltip({
        show: false,
        text: tooltipMessages.closeTab,
      });
    }

    showTooltipMessage();

    return () => {
      clearInterval(helpTooltipTimeout);
    };
  }, [isOpen]);

  const handleRemoveHelpTooltip = useCallback(() => {
    if (!tooltipMessages.help) return;

    clearTimeout(helpTooltipTimeout);

    setTooltip({
      text: tooltipMessages.openTab,
      show: false,
    });

    localStorage.setItem('removeHelpTooltip', 'true');
  }, []);

  return (
    <TooltipComponent
      isOpen={tooltip.show}
      placement='bottom'
      label={tooltip.text}
      ariaLabel={tooltip.text}
      maxW='380px'
      textAlign='center'
      onClick={handleRemoveHelpTooltip}
      pointerEvents='auto'
      cursor='default'
    >
      {children}
    </TooltipComponent>
  );
}
