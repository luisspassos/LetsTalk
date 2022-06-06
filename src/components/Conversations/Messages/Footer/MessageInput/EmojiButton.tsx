import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { Box } from '@chakra-ui/react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

export function EmojiButton() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleToggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prevState) => !prevState);
  }, []);

  return (
    <Box
      display='inline-block'
      sx={{
        'emoji-picker-react': {
          bgColor: '#F0F',
        },
      }}
    >
      <InputIconButton
        onClick={handleToggleEmojiPicker}
        ariaLabel='Emojis'
        Icon={MdOutlineEmojiEmotions}
      />
      {showEmojiPicker && (
        <EmojiPicker
          groupNames={{
            smileys_people: 'FACES & PESSOAS',
            animals_nature: 'ANIMAIS & NATUREZA',
            food_drink: 'COMIDAS & BEBIDAS',
            travel_places: 'VIAJEM & LUGARES',
            activities: 'ATIVIDADES',
            objects: 'OBJETOS',
            symbols: 'SÍMBOLOS',
            flags: 'BANDEIRAS',
            recently_used: 'RECÉM USADOS',
          }}
          onEmojiClick={() => {}}
        />
      )}
    </Box>
  );
}
