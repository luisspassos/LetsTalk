import { InputGroup, InputLeftElement, Icon, Input } from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchInConversation } from '../../../../../../contexts/SearchInConversationContext';

export const SearchInput = forwardRef(
  (_, ref: ForwardedRef<HTMLInputElement>) => {
    const { setSearchText, searchText } = useSearchInConversation();

    return (
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input
          ref={ref}
          variant='flushed'
          placeholder='Pesquisar na conversa'
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </InputGroup>
    );
  }
);

SearchInput.displayName = 'SearchInput';
