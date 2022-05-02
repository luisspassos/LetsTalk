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
      fontSize={['16px', '19px', '22px']}
      fontWeight={400}
    >
      {text}
    </Heading>
  );
}
