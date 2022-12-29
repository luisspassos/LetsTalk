import {
  Box,
  Flex,
  Icon,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsFillMicFill, BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { Avatar } from 'components/Avatar';

export function Audio() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Flex align='center' p='10px'>
      <Box pos='relative' mr='11px'>
        <Avatar
          // src='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q='
          src={undefined}
        />
        <Icon
          fontSize='25px'
          bg='gray.400'
          as={BsFillMicFill}
          pos='absolute'
          borderRadius='50%'
          p='4px'
          bottom={0}
          right={0}
        />
      </Box>
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
      <Flex
        alignSelf='stretch'
        justify='center'
        flex='1'
        direction='column'
        pos='relative'
      >
        <Slider aria-label='Barra de progresso do áudio' defaultValue={0}>
          <SliderTrack bg='whiteAlpha.400'>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Flex
          left={0}
          right={0}
          bottom='-7px'
          pos='absolute'
          justify='space-between'
        >
          <Text lineHeight='short' fontSize='small' as='time'>
            0:00
          </Text>
          <Text lineHeight='short' fontSize='small' as='time'>
            0:28
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

// BsFillPlayFill
// BsPauseFill
