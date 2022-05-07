import { Text, useColorModeValue } from '@chakra-ui/react';

type CreatedAtProps = {
  text: string;
};

export function CreatedAt({ text }: CreatedAtProps) {
  return (
    <Text
      fontSize={['13px', '14px', '15px']}
      color={useColorModeValue('gray.900', 'gray.50')}
      opacity='80%'
      as='time'
    >
      {text}
    </Text>
  );
}
