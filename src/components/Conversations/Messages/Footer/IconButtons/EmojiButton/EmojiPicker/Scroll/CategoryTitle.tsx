import { useColorModeValue } from '@chakra-ui/react';

type CategoryTitleProps = {
  text: string;
  func: Function;
};

export function CategoryTitle({ text, func }: CategoryTitleProps) {
  return (
    <h3
      style={{
        fontWeight: '400',
        color: useColorModeValue(
          'var(--chakra-colors-blackAlpha-800)',
          'var(--chakra-colors-whiteAlpha-800)'
        ),
        fontSize: '15px',
        margin: '6px 0',
      }}
    >
      {text}
    </h3>
  );
}
