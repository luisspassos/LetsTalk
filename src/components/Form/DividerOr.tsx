import { Flex } from "@chakra-ui/react";

export function DividerOr() {
  return (
    <Flex
      align='center'
      gap='3'
      color='gray.400'
      my='15px'
      fontSize='18px'
      _before={{
        content: '""',
        bg: "gray.400",
        h: "1px",
        w: "100%",
        d: "block",
        opacity: "80%",
      }}
      _after={{
        content: '""',
        bg: "gray.400",
        h: "1px",
        w: "100%",
        d: "block",
        opacity: "80%",
      }}
    >
      ou
    </Flex>
  );
}
