import { InputGroup } from '@chakra-ui/react';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { useRef } from 'react';
import { Icon } from './Icon';
import { Input } from './Input';

export type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchInput({ setSearch }: SearchInputProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { fontSize } = useFontSizeBasedOnMeasurement(ref.current, 17.5);

  return (
    <InputGroup
      fontSize={`max(${fontSize}, 0.9375rem)`}
      ref={ref}
      alignItems='center'
      justifyContent='center'
      mb={['13px', '15px', '17px']}
    >
      <Icon />
      <Input setSearch={setSearch} />
    </InputGroup>
  );
}
