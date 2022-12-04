import { Heading } from '@chakra-ui/react';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  return (
    <Heading
      maxW={['110px', '130px', '150px']}
      isTruncated
      fontSize={['14px', '16px', '17px']}
      fontWeight={400}
    >
      {text}
    </Heading>
  );
}
