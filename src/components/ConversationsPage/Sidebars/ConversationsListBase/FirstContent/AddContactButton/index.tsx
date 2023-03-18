import { Component } from 'utils/types';
import { Modal } from './Modal';

type AddContactButtonProps = {
  Buttons: Component;
};

export function Base({ Buttons }: AddContactButtonProps) {
  return (
    <>
      <Buttons />
      <Modal />
    </>
  );
}
