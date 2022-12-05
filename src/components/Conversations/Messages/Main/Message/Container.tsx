import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '..';

type ContainerProps = {
  contactMessage: Message['contactMessage'];
  children: ReactNode;
};

export function Container({ contactMessage, children }: ContainerProps) {
  const bg = {
    default: useColorModeValue('300', '500'),
    contactMessage: useColorModeValue('200', '400'),
  };

  const triangle = {
    values: {
      sizes: ['14px', '17px', '20px'],
      get negativeSizes() {
        // array for responsiveness
        return this.sizes.map((size) => `-${size}`);
      },
      get transparentBorder() {
        // array for responsiveness
        return this.sizes.map((size) => `${size} solid transparent`);
      },
    },
    styles: {
      position: 'absolute',
      bottom: 0,
      display: 'block',
      content: '""',
      w: 0,
      h: 0,
      borderRadius: '4px',
      get borderLeft() {
        return triangle.values.transparentBorder;
      },
      get borderRight() {
        return triangle.values.transparentBorder;
      },
      get borderBottom() {
        // array for responsiveness
        return triangle.values.sizes.map((size) => {
          const correctBg = contactMessage ? bg.contactMessage : bg.default;

          return `${size} solid var(--chakra-colors-gray-${correctBg})`;
        });
      },
      get mr() {
        return contactMessage ? triangle.values.negativeSizes : undefined;
      },
      get ml() {
        return !contactMessage ? triangle.values.negativeSizes : undefined;
      },
    },
  };

  const none = undefined;

  return (
    <Flex
      _before={contactMessage ? triangle.styles : none}
      _after={!contactMessage ? triangle.styles : none}
      ml={!contactMessage ? triangle.values.negativeSizes : none}
      mr={contactMessage ? triangle.values.negativeSizes : none}
      borderRadius='7px'
      bg={contactMessage ? `gray.${bg.contactMessage}` : `gray.${bg.default}`}
      position='relative'
      maxW={['240px', '300px', '400px']}
    >
      {children}
    </Flex>
  );
}
