import { Flex, FlexProps } from '@chakra-ui/react';

type WrapperProps = FlexProps;

export const gap = ['.9rem', '1.25rem'];

export function Wrapper({ children, ...rest }: WrapperProps) {
  return (
    <Flex
      align='center'
      justify='end'
      flex='1'
      minW={0}
      gap={gap}
      {...rest}
      sx={{
        'button:last-child': {
          ml: 0,
        },
      }}
    >
      {children}
    </Flex>
  );
}
