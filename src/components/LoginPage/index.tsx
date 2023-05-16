import { AuthContentPageWrapper } from 'components/Auth/AuthContentPageWrapper';
import { AuthPageWrapper } from 'components/Auth/AuthPageWrapper';
import { Form } from './Form';
import { ManEnteringImg } from './ManEnteringImg';

export function Content() {
  return (
    <AuthPageWrapper>
      <AuthContentPageWrapper gap='90px'>
        <ManEnteringImg />
        <Form />
      </AuthContentPageWrapper>
    </AuthPageWrapper>
  );
}
