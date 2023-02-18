import { DividerProps as ChakraDividerProps } from '@chakra-ui/react';
import { Divider as DividerComponent } from '../../../../Divider';

type DividerProps = {
  widthToBeRemoved: string;
} & ChakraDividerProps;

export function Divider({ widthToBeRemoved, ...rest }: DividerProps) {
  return (
    <DividerComponent
      w={`calc(100% - ${widthToBeRemoved} - ${widthToBeRemoved})`}
      borderBottomWidth='1px'
      mx='auto'
      mt={0}
      mb={0}
      opacity='40%'
      {...rest}
    />
  );
}
