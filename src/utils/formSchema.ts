import * as yup from 'yup';

export const passwordMessage = {
  required: 'Senha obrigatória',
};

export const passwordSchema = () =>
  yup.string().required(passwordMessage.required);
