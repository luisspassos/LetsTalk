import * as yup from 'yup';

export const passwordSchema = () => yup.string().required('Senha obrigatória');
