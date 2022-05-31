import { Heading } from '@chakra-ui/react';

type DangerousActionModalTitleProps = {
  text: string;
};

export function DangerousActionModalTitle({
  text,
}: DangerousActionModalTitleProps) {
  return (
    <Heading
      textAlign='center'
      fontSize={['18px', '20px', '22px']}
      fontWeight={400}
      noOfLines={1}
    >
      {text}
    </Heading>
  );
}
