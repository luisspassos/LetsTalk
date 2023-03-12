import {
  Base as BaseComponent,
  BaseProps,
} from 'components/SidebarBase/Buttons/Base';

export function Base(props: BaseProps) {
  return <BaseComponent w='90%' h='unset' {...props} />;
}
