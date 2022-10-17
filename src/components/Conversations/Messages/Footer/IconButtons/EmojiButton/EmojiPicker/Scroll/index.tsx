import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { emojis } from '../../../../../../../../utils/emojis';
import { Emoji, size as emojiSize } from './Emoji';

const allEmojis = Object.keys(emojis).flatMap((e) => emojis[e]);

const emojiCount = 1848;

export function Scroll() {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth;

  const emojiWidth = useBreakpointValue(emojiSize);

  const emojisPerRow = Math.floor(width / emojiWidth);
  const rowCount = Math.ceil(emojiCount / emojisPerRow);

  const virtualizer = useVirtual({
    size: rowCount,
    parentRef,
  });

  return (
    <Box ref={parentRef} overflow='auto'>
      <Box h={virtualizer.totalSize} w='100%' pos='relative'>
        {virtualizer.virtualItems.map((item) => (
          <Box
            key={item.index}
            ref={item.measureRef}
            pos='absolute'
            top={0}
            left={0}
            w='100%'
            display='flex'
            transform={`translateY(${item.start}px)`}
          >
            {allEmojis
              .filter((_, i) => i < emojisPerRow)
              .map((emoji) => (
                <Emoji key={emoji.emoji} emoji={emoji.emoji} />
              ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
