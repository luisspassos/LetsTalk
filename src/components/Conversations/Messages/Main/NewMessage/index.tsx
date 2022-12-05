import { Flex, Text } from '@chakra-ui/react';
import { font } from '../../Footer/MessageInput';

export function NewMessage() {
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
      position: 'absolute',
      bottom: 0,
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
          (size) => `${size} solid var(--chakra-colors-gray-${400})`
        );
      },
      borderRadius: '4px',
      ml: '-20px',
      // get mr() {
      //   return false ? triangle.values.negativeSizes : undefined;
      // },
      // get ml() {
      //   return triangle.values.negativeSizes;
      // },
    },
  };

  return (
    <Flex
      _before={triangle.styles}
      borderRadius='7px'
      bg='gray.400'
      ml='20px'
      position='relative'
      maxW={['240px', '300px', '400px']}
      mb='10px'
    >
      <Text
        fontFamily={font}
        py={['6px', '8px', '10px']}
        px={['11px', '13px', '15px']}
        fontSize={['14px', '15px', '16px']}
      >
        Em linhas gerais, numa definição bem abrangente, são sites desenvolvidos
        sem a dependência de um servidor. 🇬🇧
      </Text>
    </Flex>
  );
}
