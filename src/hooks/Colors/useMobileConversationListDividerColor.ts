import { useColorModeValue } from '@chakra-ui/react';

export function useMobileConversationListDividerColor() {
  const color = useColorModeValue(
    'mobileConversationListDivider.light',
    'mobileConversationListDivider.dark'
  );

  return {
    color,
  };
}
