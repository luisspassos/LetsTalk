import { Text } from '@chakra-ui/react';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  return (
    <Text
      noOfLines={1}
      w='100%'
      fontSize='.9em'
      fontWeight='600'
      as='strong'
      title={text}
    >
      {text}
    </Text>
  );
}
