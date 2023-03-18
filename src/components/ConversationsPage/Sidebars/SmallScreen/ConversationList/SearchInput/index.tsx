import {
  Base,
  SearchInputProps as BaseProps,
} from 'components/ConversationsPage/Sidebars/ConversationsListBase/SearchInput';
import { Icon } from './Icon';
import { Input } from './Input';

type SearchInputProps = {
  setSearch: BaseProps['setSearch'];
};

export function SearchInput({ setSearch }: SearchInputProps) {
  return (
    <Base fontSize='0.9375em' setSearch={setSearch} Icon={Icon} Input={Input} />
  );
}
