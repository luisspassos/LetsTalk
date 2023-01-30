import { useColorModeValue } from '@chakra-ui/react';
import {
  EmojiPickerScrollContextType,
  useEmojiPickerScroll,
} from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from 'contexts/EmojiPicker/SearchedEmojiContext';
import { memo } from 'react';
import { IconType } from 'react-icons';
import { transitionDurationInSeconds } from '.';

type IconProps = {
  IconComponent: IconType;
  index: number;
};

type MemoIconProps = {
  currentCategoryPosition: EmojiPickerScrollContextType['currentCategoryPosition'];
} & IconProps;

export function Icon({ IconComponent, index }: IconProps) {
  const { currentCategoryPosition } = useEmojiPickerScroll();

  return (
    <MemoIcon
      index={index}
      IconComponent={IconComponent}
      currentCategoryPosition={currentCategoryPosition}
    />
  );
}

const MemoIcon = memo(
  ({ index, IconComponent, currentCategoryPosition }: MemoIconProps) => {
    const {
      searchedEmojis: { search },
    } = useSearchedEmojis();

    const color = {
      selected: useColorModeValue(
        'var(--chakra-colors-blackAlpha-800)',
        'var(--chakra-colors-whiteAlpha-800)'
      ),
      default: useColorModeValue(
        'var(--chakra-colors-blackAlpha-600)',
        'var(--chakra-colors-whiteAlpha-600)'
      ),
    };

    const isSelected = index === currentCategoryPosition;
    const searchIsEmpty = !search;

    return (
      // chakra element isn't being used to perform the list

      <span
        style={{
          color: isSelected && searchIsEmpty ? color.selected : color.default,
          transitionDuration: transitionDurationInSeconds,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent size='clamp(18px, 50%, 22px)' />
      </span>
    );
  }
);

MemoIcon.displayName = 'Memo Icon';
