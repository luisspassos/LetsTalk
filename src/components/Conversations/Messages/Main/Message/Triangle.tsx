import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Bg, Message } from '..';

type TriangleProps = {
  contactMessage: Message['contactMessage'];
  children: ReactNode;
  bg: Bg;
};

export function Triangle({ contactMessage, children, bg }: TriangleProps) {
  const triangle = {
    values: {
      sizes: ['14px', '17px', '20px'],
      get negativeSizes() {
        return this.sizes.map((size) => `-${size}`);
      },
      get transparentBorder() {
        return this.sizes.map((size) => `${size} solid transparent`);
      },
    },
    styles: {
      display: 'block',
      content: '""',
      w: 0,
      h: 0,
      get borderLeft() {
        return triangle.values.transparentBorder;
      },
      get borderRight() {
        return triangle.values.transparentBorder;
      },
      get borderBottom() {
        return triangle.values.sizes.map(
          (size) =>
            `${size} solid var(--chakra-colors-gray-${
              contactMessage ? bg.contactMessage : bg.default
            })`
        );
      },
      borderRadius: '4px',
      get mr() {
        return contactMessage ? triangle.values.negativeSizes : undefined;
      },
      get ml() {
        return !contactMessage ? triangle.values.negativeSizes : undefined;
      },
    },
  };

  return (
    <Flex
      align='end'
      _before={contactMessage ? triangle.styles : undefined}
      _after={!contactMessage ? triangle.styles : undefined}
    >
      {children}
    </Flex>
  );
}
