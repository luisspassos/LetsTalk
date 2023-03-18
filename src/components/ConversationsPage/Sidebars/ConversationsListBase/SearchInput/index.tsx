import { InputGroup, InputGroupProps } from '@chakra-ui/react';
import { RefObject } from 'react';
import { Icon } from './Icon';
import { Input } from './Input';

export type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  componentRef?: RefObject<HTMLDivElement>;
  Icon: Icon;
  Input: Input;
} & InputGroupProps;

export function Base({
  setSearch,
  componentRef,
  Icon,
  Input,
  ...rest
}: SearchInputProps) {
  return (
    <InputGroup
      ref={componentRef}
      alignItems='center'
      justifyContent='center'
      mb={['0.8125rem', '0.9375rem', '1.0625rem']}
      {...rest}
    >
      <Icon />
      <Input setSearch={setSearch} />
    </InputGroup>
  );
}
