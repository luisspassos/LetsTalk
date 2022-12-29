import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { BsPauseFill, BsFillPlayFill } from 'react-icons/bs';

export function Button() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <IconButton
      variant='unstyled'
      p={0}
      h='auto'
      minW='0'
      aria-label={isPlaying ? 'Pausar áudio' : 'Tocar áudio'}
      icon={isPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
      display='inline-flex'
      fontSize='35px'
      mr='19px'
      onClick={() => {
        setIsPlaying((prevValue) => !prevValue);
      }}
    />
  );
}
