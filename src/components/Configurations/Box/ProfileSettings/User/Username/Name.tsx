import { Text } from '@chakra-ui/react';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  return (
    <Text
      whiteSpace='nowrap'
      overflow='hidden'
      textOverflow='ellipsis'
      maxW='316px'
      w='100%'
      fontSize={['16px', '17px', '18px']}
      fontWeight='600'
      as='strong'
      title={text}
    >
      {text}
    </Text>
  );
}
