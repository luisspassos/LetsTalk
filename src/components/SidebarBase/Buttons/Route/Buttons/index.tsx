import { RouteProps } from '..';
import { ConfigurationsButton } from './ConfigurationsButton';
import { ConversationsButton } from './ConversationsButton';

export type DefaultProps = Pick<RouteProps, 'Base'>;

type RouteButtonsProps = DefaultProps;

export function RouteButtons(props: RouteButtonsProps) {
  return (
    <>
      <ConversationsButton {...props} />
      <ConfigurationsButton {...props} />
    </>
  );
}
