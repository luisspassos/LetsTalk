import {
  PlayButton as PlayButtonComponent,
  PlayButtonProps,
} from 'components/Audio/Buttons/Play';
import { styles } from '.';

export function PlayButton(props: PlayButtonProps) {
  return <PlayButtonComponent {...styles} {...props} />;
}
