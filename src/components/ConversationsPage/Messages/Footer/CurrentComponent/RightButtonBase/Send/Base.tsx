import { MdSend } from 'react-icons/md';
import { Base as BaseComponent, IconButtonProps } from '../Base';

type BaseProps = IconButtonProps;

export function Base({ label, ...rest }: BaseProps) {
  return (
    <BaseComponent fontSize='24px' icon={MdSend} label={label} {...rest} />
  );
}
