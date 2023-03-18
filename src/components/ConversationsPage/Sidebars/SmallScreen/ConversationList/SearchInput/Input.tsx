import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import { SearchInputProps } from 'components/ConversationsPage/Sidebars/ConversationsListBase/SearchInput';
import { Base } from 'components/ConversationsPage/Sidebars/ConversationsListBase/SearchInput/Input';

type InputProps = {
  setSearch: SearchInputProps['setSearch'];
} & ChakraInputProps;

export function Input({ setSearch, ...rest }: InputProps) {
  return <Base setSearch={setSearch} h='2.9em' pl='2.5em' {...rest} />;
}
