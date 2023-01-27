import { Box } from '@chakra-ui/react';
import { Message } from 'components/ConversationsPage/Messages/Main';
import { Icon } from './Icon';
import { Image } from './Image';

type AvatarProps = {
  isContact: Message['contactMessage'];
};

export function Avatar({ isContact }: AvatarProps) {
  return (
    <Box pos='relative' bg='inherit'>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image isContact={isContact} />
      <Icon />
    </Box>
  );
}
