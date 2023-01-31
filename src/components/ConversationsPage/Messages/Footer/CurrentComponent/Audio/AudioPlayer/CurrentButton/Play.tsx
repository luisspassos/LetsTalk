import { ButtonProps } from 'components/Audio/Buttons/CurrentButton';
import { PlayButton as PlayButtonComponent } from 'components/Audio/Buttons/Play';
import { styles } from '.';

export function PlayButton(props: ButtonProps) {
  return <PlayButtonComponent {...styles} {...props} />;
}
