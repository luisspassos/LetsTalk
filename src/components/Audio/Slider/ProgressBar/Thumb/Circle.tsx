import { Box } from '@chakra-ui/react';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { KeyboardEvent } from 'react';

export function Circle() {
  const { setPositionInPercentage } = useAudioPositionInPercentage();

  function handleKeys(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();

    const key = e.key;

    function increase() {}

    function decrease() {}

    function setMax() {
      console.log('here');
      setPositionInPercentage(100);
    }

    function setMin() {}

    const keyEvents = [
      {
        keys: ['ArrowUp', 'ArrowRight'],
        event: increase,
      },
      {
        keys: ['ArrowLeft', 'ArrowDown'],
        event: decrease,
      },
      {
        keys: ['End'],
        event: setMax,
      },
      {
        keys: ['Home'],
        event: setMin,
      },
    ];

    const keyEvent = keyEvents.find((e) => e.keys.includes(key));

    if (!keyEvent) return;

    const event = keyEvent?.event;

    event();
  }

  return (
    <Box
      role='slider'
      aria-orientation='horizontal'
      aria-label='Controle de progresso do áudio'
      tabIndex={0}
      onKeyDown={handleKeys}
      h='100%'
      bg='current'
      borderRadius='50%'
      pos='absolute'
      right='0'
      cursor='pointer'
      transform='translateX(50%)'
      pointerEvents='none'
      outline={0}
      sx={{
        '&': {
          aspectRatio: '1 / 1',
        },
      }}
      _focusVisible={{
        boxShadow: 'outline',
      }}
    />
  );
}
