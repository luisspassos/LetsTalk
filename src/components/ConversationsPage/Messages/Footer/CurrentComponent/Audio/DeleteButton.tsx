import { useColorModeValue } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useStopAudio } from 'hooks/Audio/useStopAudio';
import { MdDelete } from 'react-icons/md';
import { Props } from '.';
import { SetIsRecordingAudio } from '..';
import { IconButton, IconButtonProps } from './IconButton';

type NewIconButtonProps = Pick<IconButtonProps, 'onClick'>;

type DeleteButtonProps = {
  setIsRecordingAudio?: SetIsRecordingAudio;
  setCurrentComponent?: Props['setCurrentComponent'];
} & NewIconButtonProps;

export function DeleteButton({
  setCurrentComponent,
  setIsRecordingAudio,
  ...rest
}: DeleteButtonProps) {
  const { stopAudio } = useStopAudio({
    setCurrentComponent,
    componentToDisplay: 'recording',
  });

  const { resetAudioRecording } = useAudioRecording();

  function handleDeleteAudio() {
    const theresAnotherOnClick = setIsRecordingAudio === undefined;

    if (theresAnotherOnClick) return;

    stopAudio();
    resetAudioRecording();

    setIsRecordingAudio(false);
  }

  return (
    <IconButton
      onClick={handleDeleteAudio}
      color={useColorModeValue('red.600', 'red.300')}
      icon={<MdDelete />}
      aria-label='Excluir áudio'
      {...rest}
    />
  );
}
