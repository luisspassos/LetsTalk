import { Stack } from '@chakra-ui/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { DangerousActionIcon } from '../../../Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from '../../../Modal/DangerousAction/DangerousActionModalTitle';

export function Header() {
  return (
    <Stack as='header' spacing='5px' align='center' mb='14px'>
      <DangerousActionIcon Icon={RiDeleteBin2Line} />
      <DangerousActionModalTitle text='Você deseja excluir sua conta?' />
    </Stack>
  );
}
