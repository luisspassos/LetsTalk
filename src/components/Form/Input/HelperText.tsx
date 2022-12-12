import { FormHelperText, useColorModeValue } from '@chakra-ui/react';

type HelperTextProps = {
  children: string;
};

export function HelperText({ children }: HelperTextProps) {
  const helperTextColor = useColorModeValue('gray.900', 'gray.200');

  return (
    <FormHelperText
      fontSize={['12.5px', '13px', '14px']}
      color={helperTextColor}
    >
      {children}
    </FormHelperText>
  );
}
