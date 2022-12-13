import { Divider } from '../../../Divider';
import { Box } from '../../Box';
import { Buttons } from './Buttons';
import { User } from './User';

export function ProfileSettings() {
  return (
    <Box title='Configurações de perfil'>
      <User />
      <Divider />
      <Buttons />
    </Box>
  );
}
