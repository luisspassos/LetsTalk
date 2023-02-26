import { Text } from '@chakra-ui/react';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Tooltip as ChakraTooltip } from 'components/Tooltip';

type TooltipProps = {
  children: ReactNode;
  copiedUsername: boolean;
  setCopiedUsername: Dispatch<SetStateAction<boolean>>;
  username: string;
};

export function Tooltip({
  copiedUsername,
  setCopiedUsername,
  username,
  children,
}: TooltipProps) {
  return (
    <ChakraTooltip
      bg={copiedUsername ? 'green.500' : undefined}
      label={
        copiedUsername ? (
          'Nome de usuário copiado!'
        ) : (
          <Text isTruncated maxW={['300px', '350px', '400px']}>
            Copiar nome de usuário | {username}
          </Text>
        )
      }
      ariaLabel={
        copiedUsername
          ? 'Nome de usuário copiado!'
          : `Copiar Nome de usuário. ${username}`
      }
      closeOnClick={false}
      onClose={() => setCopiedUsername(false)}
    >
      {children}
    </ChakraTooltip>
  );
}
