import { Flex, Stack } from '@chakra-ui/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { DangerousActionButtons } from '../../../Modal/DangerousAction/DangerousActionButtons';
import { DangerousActionIcon } from '../../../Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from '../../../Modal/DangerousAction/DangerousActionModalTitle';
import { ModalInput } from '../../../Modal/ModalInput';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import * as yup from 'yup';
import { regexs } from '../../../../utils/regexs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WarningText } from './WarningText';

type PasswordFormData = {
  name: string;
};

const PasswordFormSchema = yup.object().shape({
  contactName: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
});

export function DeleteAccountModal() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(PasswordFormSchema),
  });

  return (
    <ModalWrapper isOpen={false} onClose={() => {}}>
      <Flex direction='column' align='center'>
        <Stack spacing='5px' align='center' mb='8px'>
          <DangerousActionIcon Icon={RiDeleteBin2Line} />
          <DangerousActionModalTitle text='Você deseja excluir sua conta?' />
        </Stack>
        <ModalInput
          id='password'
          label='Senha'
          placeholder='Digite sua senha para apagar sua conta'
          error={errors.name}
          register={register}
          type='password'
        />
        <DangerousActionButtons confirmButtonText='Deletar' />
        <WarningText />
      </Flex>
    </ModalWrapper>
  );
}
