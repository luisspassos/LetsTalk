import { IsSubmitting } from 'utils/types';
import { Button as ButtonComponent } from 'components/Form/Button';

type ButtonProps = {
  isSubmitting: IsSubmitting;
};

export function Button({ isSubmitting }: ButtonProps) {
  return (
    <ButtonComponent
      isLoading={isSubmitting}
      type='submit'
      text='ENVIAR'
      mt='.5rem'
    />
  );
}
