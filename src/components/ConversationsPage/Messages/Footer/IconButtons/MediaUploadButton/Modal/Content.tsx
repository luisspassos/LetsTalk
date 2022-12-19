import { Wrapper } from 'components/ConversationsPage/Messages/Modal/Content/Wrapper';
import { Video } from 'components/Video';

export function Content() {
  return (
    <Wrapper>
      {/* <ChakraImage
            maxH='60vh'
            src={
              // 'https://imgv3.fotor.com/images/blog-cover-image/Image-Upscaler-2.jpg'
              './favicon.svg'
            }
            alt='image'
          /> */}
      <Video
        src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        maxH='60vh'
      />
    </Wrapper>
  );
}
