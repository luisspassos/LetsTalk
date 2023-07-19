import { useColorModeValue } from '@chakra-ui/react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type DefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type CategoryTitleProps = {
  text: string;
  'data-testid': string;
} & DefaultProps;

export function CategoryTitle({ text, ...props }: CategoryTitleProps) {
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
      {...props}
      data-testid={`${props['data-testid']} title`}
    >
      {text}
    </h3>
  );
}
