import { Base as BaseComponent, BaseProps } from '.';

type DividerBelowTitleProps = BaseProps;

export function Base(props: DividerBelowTitleProps) {
  return (
    <BaseComponent
      opacity='15%'
      borderBottomWidth='2px'
      mb={['0.875rem', '1rem', '1.125rem']}
      {...props}
    />
  );
}
