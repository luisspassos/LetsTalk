import { usePageIsSelected } from 'hooks/usePageIsSelected';
import { useRouter } from 'next/router';
import { BsGearFill, BsGear } from 'react-icons/bs';
import { Button } from './Button';

export function ConfigurationsButton() {
  const page = 'configuracoes';

  const isSelected = usePageIsSelected(page);
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/${page}`)}
      isSelected={isSelected}
      icon={isSelected ? <BsGearFill /> : <BsGear />}
      aria-label='Configurações'
    />
  );
}
