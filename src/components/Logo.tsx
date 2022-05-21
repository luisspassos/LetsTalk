import { Box, useColorModeValue } from '@chakra-ui/react';

export function Logo() {
  const color = useColorModeValue('blue.900', 'white');

  return (
    <Box
      pointerEvents='none'
      sx={{
        '#Logo': {
          height: ['40px', '45px'],
          path: {
            fill: color,
            transform: 'translateX(267px) translateY(-3px)',
          },
          text: {
            fill: color,
          },
        },
      }}
    >
      <svg
        id='Logo'
        data-name='Logo'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 310 72'
      >
        <text
          id='Let_s_Talk'
          data-name="Let's Talk"
          transform='translate(0 54)'
          fontSize='51'
          fontFamily='Poppins-Bold, Poppins'
          fontWeight='700'
          letterSpacing='0.04em'
        >
          <tspan x='0' y='0'>
            Let&apos;s Talk
          </tspan>
        </text>
        <path
          id='Icon_material-message'
          data-name='Icon material-message'
          d='M39,3H7A4,4,0,0,0,3.02,7L3,43l8-8H39a4.012,4.012,0,0,0,4-4V7A4.012,4.012,0,0,0,39,3ZM35,27H11V23H35Zm0-6H11V17H35Zm0-6H11V11H35Z'
        />
      </svg>
    </Box>
  );
}
