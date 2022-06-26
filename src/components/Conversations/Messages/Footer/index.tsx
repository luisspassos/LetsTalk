import { Flex, FormControl } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { MessageInput } from './MessageInput';
import { EmojiPicker } from './MessageInput/EmojiButton/EmojiPicker';
import { RecordButtonAudio } from './Buttons/RecordButtonAudio';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageFormData } from '../../../../utils/types';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { SendMessageButton } from './Buttons/SendMessageButton';

export type HandleSendMessage = (
  e?: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

const messageFormSchema = yup.object().shape({
  message: yup.string().trim().required(),
});

export function Footer() {
  const [thereIsNoMessage, setThereIsNoMessage] = useState(true);

  const { register, handleSubmit, reset, watch } = useForm<MessageFormData>({
    resolver: yupResolver(messageFormSchema),
  });

  useEffect(() => {
    const { unsubscribe } = watch(({ message }) => {
      if (!message) {
        setThereIsNoMessage(true);
      } else {
        setThereIsNoMessage(false);
      }
    });

    return () => unsubscribe();
  }, [watch]);

  const handleSendMessage = handleSubmit(async () => {
    console.log('Send message');
    reset();
  });

  return (
    <FormControl as='form' mt='auto'>
      <EmojiPicker />
      <Divider />
      <Flex
        as='footer'
        py={['11px', '13px', '15px']}
        minH={['50px', '65px', '80px']}
        align='center'
        justify='start'
        pl={['6px', '8px', '10px']}
        pos='relative'
      >
        <MessageInput
          handleSendMessage={handleSendMessage}
          register={register}
        />
        {thereIsNoMessage ? (
          <RecordButtonAudio />
        ) : (
          <SendMessageButton handleSendMessage={handleSendMessage} />
        )}
      </Flex>
    </FormControl>
  );
}
