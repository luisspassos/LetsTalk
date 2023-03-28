import { ResetRecording } from '.';
import { DeleteButton as Base } from '../DeleteButton';

type DeleteButtonProps = {
  resetRecording: ResetRecording;
};

export function DeleteButton({ resetRecording }: DeleteButtonProps) {
  return <Base onClick={resetRecording} />;
}
