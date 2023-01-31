import { ButtonProps } from 'components/Audio/Buttons/CurrentButton';
import { PauseButton as PauseButtonComponent } from 'components/Audio/Buttons/Pause';
import { styles } from '.';

export function PauseButton(props: ButtonProps) {
  return <PauseButtonComponent {...styles} {...props} />;
}
