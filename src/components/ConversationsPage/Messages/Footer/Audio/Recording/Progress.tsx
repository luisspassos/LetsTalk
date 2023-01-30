import { Box, keyframes, useToken } from '@chakra-ui/react';

const progress = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(46px);
  }
`;

const animation = `${progress} 1.5s infinite linear`;

export function Progress() {
  const [gray200, gray300] = useToken('colors', ['gray.200', 'gray.300']);

  return (
    <Box
      pos='relative'
      overflow='hidden'
      width='130px'
      height='9px'
      borderRadius='30px'
      boxShadow='base'
    >
      <Box
        pos='absolute'
        left='-46px'
        right={0}
        top={0}
        bottom={0}
        animation={animation}
        bg={`repeating-linear-gradient(
          -55deg,
          ${gray300} 1px,
          ${gray200} 2px,
          ${gray200} 11px,
          ${gray300} 12px,
          ${gray300} 20px
        )`}
      />
    </Box>
  );
}
