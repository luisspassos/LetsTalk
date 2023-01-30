import { Wrapper } from 'components/ConversationsPage/Messages/Modal/Content/Wrapper';
import { Video } from 'components/Video';
import { ModalContent } from '..';
import { Image as ChakraImage } from '@chakra-ui/react';

type ContentProps = {
  content: ModalContent;
};

export function Content({ content }: ContentProps) {
  const media =
    content.type === 'image' ? (
      <ChakraImage src={content.src} alt={content.name} />
    ) : (
      <Video src={content.src} />
    );

  return <Wrapper maxH='60vh'>{media}</Wrapper>;
}
