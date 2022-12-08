import { HStack } from '@chakra-ui/react';
import { CloseButton } from './Button/CloseButton';
import { DownloadButton } from './Button/DownloadButton';

export function Footer() {
  return (
    <HStack as='footer' mt='5px' spacing='3px'>
      <CloseButton />
      <DownloadButton />
    </HStack>
  );
}
