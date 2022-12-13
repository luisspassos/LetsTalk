import { Text, useColorModeValue } from '@chakra-ui/react';

type IdProps = {
  text: string;
};

export function Id({ text }: IdProps) {
  return (
    <Text
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
      fontSize={['12px', '13px', '14px']}
      as='small'
    >
      #{text}
    </Text>
  );
}
