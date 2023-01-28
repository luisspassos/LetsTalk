import { Flex, FlexProps } from '@chakra-ui/react';

type WrapperProps = FlexProps;

export function Wrapper({ children, ...rest }: WrapperProps) {
  return (
    <Flex
      align='center'
      gap='20px'
      ml='10px'
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
