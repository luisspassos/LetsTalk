import { Stack } from '@chakra-ui/react';
import { DangerousActionIcon } from 'components/Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from 'components/Modal/DangerousAction/DangerousActionModalTitle';
import { RiDeleteBin2Line } from 'react-icons/ri';

export function Header() {
  return (
    <Stack as='header' spacing='5px' align='center' mb='14px'>
      <DangerousActionIcon Icon={RiDeleteBin2Line} />
      <DangerousActionModalTitle text='Você deseja excluir sua conta?' />
    </Stack>
  );
}
