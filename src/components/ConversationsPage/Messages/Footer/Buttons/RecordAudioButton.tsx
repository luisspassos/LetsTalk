import { AiFillAudio } from 'react-icons/ai';
import { Button } from '.';
import { Tooltip } from '../../../../Tooltip';

const label = 'Gravar áudio';

export function RecordAudioButton() {
  function handleRecordAudio() {}

  return (
    <Tooltip hasArrow={false} ariaLabel={label} label={label} placement='top'>
      <Button onClick={handleRecordAudio} icon={AiFillAudio} label={label} />
    </Tooltip>
  );
}
