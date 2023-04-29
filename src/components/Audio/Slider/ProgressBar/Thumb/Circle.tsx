import { Box } from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { SharedProps } from '..';

type CircleProps = {
  audioDuration: SharedProps['duration'];
};

export function Circle({ audioDuration }: CircleProps) {
  const continueEvent = useRef(false);

  useEffect(() => {
    if (continueEvent.current === false) return;

    continueEvent.current = false;
  }, []);

  function handleKeys(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();

    function increase() {}

    function decrease() {}

    function setMin() {
      // setPositionInPercentage(100);
      continueEvent.current = true;
    }

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
        keys: ['Home'],
        event: setMin,
      },
    ];

    const key = e.key;

    const keyEvent = keyEvents.find((e) => e.keys.includes(key));

    if (!keyEvent) return;

    const event = keyEvent.event;

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
