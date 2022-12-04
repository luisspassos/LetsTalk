import { useColorModeValue } from '@chakra-ui/react';

type CategoryTitleProps = {
  text: string;
};

export function CategoryTitle({ text }: CategoryTitleProps) {
  return (
    // chakra element isn't being used to perform the list

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
