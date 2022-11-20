import { AiFillAudio } from 'react-icons/ai';
import { Button } from '.';
import { Tooltip } from '../../../../Tooltip';
import { ButtonWrapper } from '../ButtonWrapper';

const label = 'Gravar áudio';

export function RecordButtonAudio() {
  return (
    <ButtonWrapper>
      <Tooltip hasArrow={false} ariaLabel={label} label={label} placement='top'>
        <span>
          <Button label={label} icon={AiFillAudio} />
        </span>
      </Tooltip>
    </ButtonWrapper>
  );
}

// AiFillAudio
// Gravar áudio
