import { Icon, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { HiOutlineUsers, HiUsers } from 'react-icons/hi';
import { useConversationsTab } from '../../../../contexts/ConversationsTabContext';
import { Tooltip } from '../../../Tooltip';

type TooltipText = {
  text: string;
  show: undefined | true;
};

const tooltipMessages = {
  openTab: 'Abrir aba de conversas',
  closeTab: 'Esconder aba de conversas',
  help: 'Aperte aqui para alternar a aba de conversas. Para fechar este aviso, clique nele.',
};

let helpTooltipTimeout: NodeJS.Timeout;

export function ConversationsTabToggleButton() {
  const { onToggle, isOpen } = useConversationsTab();

  const [tooltip, setTooltip] = useState<TooltipText>({
    text: tooltipMessages.closeTab,
    show: undefined,
  });

  const icon = isOpen ? HiUsers : HiOutlineUsers;

  useEffect(() => {
    function showTooltipMessage() {
      const removeHelpTooltip =
        localStorage.getItem('removeHelpTooltip') !== null;

      if (!isOpen && !removeHelpTooltip) {
        helpTooltipTimeout = setTimeout(() => {
          setTooltip({
            show: undefined,
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
        show: undefined,
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
      show: undefined,
    });

    localStorage.setItem('removeHelpTooltip', 'true');
  }, []);

  return (
    <Tooltip
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
      <IconButton
        variant='ghost'
        fontSize={['28px']}
        color={useColorModeValue('gray.400', 'gray.200')}
        icon={<Icon as={icon} />}
        aria-label='Botão de alternar aba de conversas'
        onClick={onToggle}
      />
    </Tooltip>
  );
}
