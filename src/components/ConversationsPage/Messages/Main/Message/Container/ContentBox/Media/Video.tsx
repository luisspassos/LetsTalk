import { Wrapper } from './Wrapper';
import { Video as VideoComponent } from 'components/Video';

export function Video() {
  return (
    <Wrapper>
      <VideoComponent src='./tiktok.mp4' />
    </Wrapper>
  );
}

// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
