import { Divider } from '../../../Divider';
import { Wrapper } from './Wrapper';
import { EndButtons } from './EndButtons';
import { FirstContent } from './FirstContent';

export function Header() {
  return (
    <>
      <Wrapper>
        <FirstContent />
        <EndButtons />
      </Wrapper>
      <Divider />
    </>
  );
}
