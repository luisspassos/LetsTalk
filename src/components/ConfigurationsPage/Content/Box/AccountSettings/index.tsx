import { Box } from '../../Box';
import { Buttons } from './Buttons';
import { ThemeSelect } from './ThemeSelect';

export function AccountSettings() {
  return (
    <Box title='Configurações de conta'>
      <ThemeSelect />
      <Buttons />
    </Box>
  );
}
