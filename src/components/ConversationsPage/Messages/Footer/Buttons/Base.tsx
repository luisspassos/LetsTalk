import {
  Icon,
  IconButton,
  IconButtonProps as ChakraIconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IconType } from 'react-icons';

export type IconButtonProps = {
  label: string;
} & Omit<ChakraIconButtonProps, 'icon' | 'aria-label'>;

export type BaseProps = {
  icon: IconType;
} & IconButtonProps;

export const Base = forwardRef<HTMLButtonElement, BaseProps>(
  ({ icon, label, ...rest }, ref) => {
    const styles = {
      bg: useColorModeValue('blue.900', 'gray.400'),
      active: {
        bg: useColorModeValue('blueAlpha.900', 'gray.500'),
      },
    };

    return (
      <IconButton
        ref={ref}
        flexShrink={0}
        fontSize='22px'
        w='45px'
        h='45px'
        borderRadius='15px'
        ml={['11px', '13px', '15px']}
        color='white'
        bg={styles.bg}
        aria-label={label}
        icon={<Icon as={icon} />}
        _hover={{
          bg: styles.bg,
        }}
        _active={{
          bg: styles.active,
        }}
        {...rest}
      />
    );
  }
);

Base.displayName = 'Base';
