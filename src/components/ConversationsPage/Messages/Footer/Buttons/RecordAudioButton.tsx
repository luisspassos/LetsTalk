import { AiFillAudio } from 'react-icons/ai';
import { Button } from '.';
import { Tooltip } from '../../../../Tooltip';

const label = 'Gravar áudio';

export function RecordAudioButton() {
  return (
    <Tooltip hasArrow={false} ariaLabel={label} label={label} placement='top'>
      <Button icon={AiFillAudio} label={label} />
    </Tooltip>
  );
}
