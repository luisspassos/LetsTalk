import { Button } from './Button';
import { Tooltip } from './Tooltip';

export function ConversationsTabToggleButton() {
  return (
    <Tooltip>
      {/* this span is for the tooltip to work correctly */}
      <span>
        <Button />
      </span>
    </Tooltip>
  );
}
