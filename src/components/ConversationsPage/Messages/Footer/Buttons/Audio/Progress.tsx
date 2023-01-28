import { Box, keyframes } from '@chakra-ui/react';

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
  return (
    <Box
      pos='relative'
      overflow='hidden'
      width='150px'
      height='12px'
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
        bg='repeating-linear-gradient(
          -55deg,
          #afb9c5 1px,
          #d8dce7 2px,
          #d8dce7 11px,
          #afb9c5 12px,
          #afb9c5 20px
        )'
      />
    </Box>
  );
}
