import { useColorModeValue } from '@chakra-ui/react';
import { useStopAudio } from 'hooks/useStopAudio';
import { MdDelete } from 'react-icons/md';
import { Props } from '.';
import { SetIsRecordingAudio } from '..';
import { IconButton } from './IconButton';

type DeleteButtonProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
} & Props;

export function DeleteButton({
  setCurrentComponent,
  setIsRecordingAudio,
}: DeleteButtonProps) {
  const { stopAudio } = useStopAudio({
    setCurrentComponent,
    componentToDisplay: 'recording',
  });

  function handleDeleteAudio() {
    stopAudio();
    setIsRecordingAudio(false);
  }

  return (
    <IconButton
      onClick={handleDeleteAudio}
      color={useColorModeValue('red.600', 'red.300')}
      icon={<MdDelete />}
      aria-label='Excluir áudio'
    />
  );
}
