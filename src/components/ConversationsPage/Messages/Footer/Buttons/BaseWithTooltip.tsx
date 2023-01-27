import { Tooltip } from 'components/Tooltip';
import { Base, BaseProps } from './Base';

type BaseWithTooltipProps = BaseProps;

export function BaseWithTooltip(props: BaseWithTooltipProps) {
  return (
    <Tooltip
      hasArrow={false}
      ariaLabel={props.label}
      label={props.label}
      placement='top'
      mr='5px'
    >
      <Base {...props} />
    </Tooltip>
  );
}
