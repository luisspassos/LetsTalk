import { Button as ButtonComponent } from 'components/Form/Button';
import { IsSubmitting } from 'utils/types';

type ButtonProps = {
  isSubmitting: IsSubmitting;
};

export function Button({ isSubmitting }: ButtonProps) {
  return (
    <ButtonComponent
      isLoading={isSubmitting}
      text='REDEFINIR'
      mt='.7rem'
      type='submit'
    />
  );
}
