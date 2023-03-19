import { Flex, keyframes, Text, useColorModeValue } from '@chakra-ui/react';
import useResizeObserver from '@react-hook/resize-observer';
import { onSnapshot, doc } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { useConversations } from '../../../../../../contexts/ConversationsContext';
import { db } from '../../../../../../services/firebase';
import { formatContactOnlineAt } from '../../../../../../utils/formatDate';
import { OnlineAt } from '../../../../../../utils/types';

type OnlineAtFormatted = string;

type ContactDocumentData = {
  onlineAt: OnlineAt;
  uid: string;
};

const marquee = keyframes`
  0% {
    margin-left: 100%;
  } 100% {
    transform: translateX(-100%);
  }
`;

const animation = `${marquee} 6s linear infinite`;

export function OnlineAt() {
  const [onlineAt, setOnlineAt] = useState<OnlineAtFormatted>();
  const { currentConversation } = useConversations();

  useEffect(() => {
    function getOnlineAt() {
      if (!currentConversation.data?.username) return;

      const unsub = onSnapshot(
        doc(db, 'users', currentConversation.data.username),
        (doc) => {
          const docData = doc.data() as ContactDocumentData;

          const onlineAtFormatted = formatContactOnlineAt(docData.onlineAt);

          setOnlineAt(onlineAtFormatted);
        }
      );

      return unsub;
    }

    const unsub = getOnlineAt();

    return () => {
      unsub && unsub();
    };
  }, [currentConversation.data?.username]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [isOverflown, setIsOverflown] = useState(false);

  function getIsOverflown() {
    const wrapper = wrapperRef.current;
    const text = textRef.current;

    if (wrapper === null || text === null) return;

    const newIsOverflown = text.offsetWidth > wrapper.offsetWidth;

    setIsOverflown(newIsOverflown);
  }

  useResizeObserver(wrapperRef, getIsOverflown);

  return (
    <Flex overflow='hidden' w='100%' ref={wrapperRef}>
      <Text
        as='time'
        ref={textRef}
        fontSize='0.83em'
        color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        whiteSpace='nowrap'
        animation={isOverflown ? animation : undefined}
      >
        {onlineAt}
      </Text>
    </Flex>
  );
}
