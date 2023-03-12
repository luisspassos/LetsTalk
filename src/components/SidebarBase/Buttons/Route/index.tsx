import { usePageIsSelected } from 'hooks/usePageIsSelected';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { Base } from '../Base';

export type RouteProps = {
  page: string;
  Base: Base;
  icon: {
    default: IconType;
    selected: IconType;
  };
  'aria-label': string;
};

export function Route({ page, Base, icon, ...rest }: RouteProps) {
  const isSelected = usePageIsSelected(page);
  const router = useRouter();

  return (
    <Base
      onClick={() => router.push(`/${page}`)}
      isSelected={isSelected}
      icon={isSelected ? <icon.selected /> : <icon.default />}
      {...rest}
    />
  );
}
