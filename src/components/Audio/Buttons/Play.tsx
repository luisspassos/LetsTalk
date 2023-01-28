import { IconButtonProps } from '@chakra-ui/react';
import { Base } from 'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio/InteractiveElements/Buttons/Base';
import { BsFillPlayFill } from 'react-icons/bs';

type ButtonProps = Omit<IconButtonProps, 'aria-label'>;

export function Button(props: ButtonProps) {
  return <Base icon={<BsFillPlayFill />} aria-label='Tocar áudio' {...props} />;
}
