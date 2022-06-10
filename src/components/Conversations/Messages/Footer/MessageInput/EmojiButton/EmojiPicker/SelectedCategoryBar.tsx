import { Box } from '@chakra-ui/react';

type SelectedCategoryBarProps = {
  selectedCategoryIndex: number;
};

export function SelectedCategoryBar({
  selectedCategoryIndex,
}: SelectedCategoryBarProps) {
  return (
    <Box
      h='4px'
      bottom={0}
      w='101.33px'
      position='absolute'
      bgColor='gray.300'
      transform={`translateX(${selectedCategoryIndex * 100}%)`}
      transition='0.2s'
    />
  );
}
