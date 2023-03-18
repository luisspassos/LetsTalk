import { Modal } from './Modal';

type AddContactButtonProps = {
  Buttons: () => JSX.Element;
};

export function Base({ Buttons }: AddContactButtonProps) {
  return (
    <>
      <Buttons />
      <Modal />
    </>
  );
}
