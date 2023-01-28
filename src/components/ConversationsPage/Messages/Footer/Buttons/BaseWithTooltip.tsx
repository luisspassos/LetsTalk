import { Tooltip } from '../Tooltip';
import { Base, BaseProps } from './Base';

type BaseWithTooltipProps = BaseProps;

export function BaseWithTooltip(props: BaseWithTooltipProps) {
  return (
    <Tooltip ariaLabel={props.label} label={props.label} mr='5px'>
      <Base {...props} />
    </Tooltip>
  );
}
