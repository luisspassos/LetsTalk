import { useTab } from 'contexts/TabContext';
import { BsGearFill, BsGear } from 'react-icons/bs';
import { Button } from './Button';

export function ConfigurationsButton() {
  const { handleChangeTab, tab } = useTab();

  const isSelected = tab === 'configurations';

  return (
    <Button
      onClick={() => handleChangeTab('configurations')}
      isSelected={isSelected}
      icon={isSelected ? <BsGearFill /> : <BsGear />}
      aria-label='Configurações'
    />
  );
}
