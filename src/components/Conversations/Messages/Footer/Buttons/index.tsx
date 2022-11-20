import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type ButtonProps = {
  label: string;
  icon: IconType;
} & Omit<IconButtonProps, 'icon' | 'aria-label'>;

export function Button({ icon, label, ...rest }: ButtonProps) {
  const styles = {
    bg: useColorModeValue('blue.900', 'gray.400'),
    active: {
      bg: useColorModeValue('blueAlpha.900', 'gray.500'),
    },
  };

  return (
    <IconButton
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
