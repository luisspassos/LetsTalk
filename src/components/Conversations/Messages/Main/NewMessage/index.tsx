import { Box, Flex } from '@chakra-ui/react';
import { Text } from '../Message/Text';
import { Triangle } from './Triangle';

export function NewMessage() {
  return (
    <Flex>
      <Box
        bg='gray.400'
        borderRadius='7px 7px 0'
        maxW={['240px', '300px', '400px']}
      >
        <Text>
          Em linhas gerais, numa definição bem abrangente, são sites
          desenvolvidos sem a dependência de um servidor. 🇬🇧
        </Text>
      </Box>
      <Triangle />
    </Flex>
  );
}
