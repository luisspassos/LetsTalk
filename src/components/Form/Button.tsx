import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

type ButtonProps = {
  text: string;
} & ChakraButtonProps;

export function Button({ text, ...rest }: ButtonProps) {
  return <ChakraButton {...rest}>{text}</ChakraButton>;
}
