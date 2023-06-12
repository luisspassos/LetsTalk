import { BsGearFill, BsGear } from 'react-icons/bs';
import { DefaultProps } from '.';
import { Route } from '..';

type ConfigurationsButtonProps = DefaultProps;

export function ConfigurationsButton({ Base }: ConfigurationsButtonProps) {
  return (
    <Route
      Base={Base}
      icon={{ default: BsGear, selected: BsGearFill }}
      page='configuracoes'
      aria-label='Configurações'
      data-testid='go to settings page button'
    />
  );
}
