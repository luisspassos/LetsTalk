import { Box, useBreakpointValue } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { useAuth } from '../../../../contexts/AuthContext';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { useSearchInConversation } from '../../../../contexts/SearchInConversationContext';
import { db } from '../../../../services/firebase';
import { ConversationDocWithContactData } from '../../../../types';
import { Message } from './Message';
import { useConversationPopover } from '../../../../contexts/ConversationPopoverContext';

type DbMessageData = {
  author: string;
  message: string;
  sentIn: number;
};

type Message = {
  id: string;
  sentIn: string;
  message: string;
  contactMessage: boolean;
};

export function Main() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'a',
      sentIn: '19:40',
      message:
        'O que significa e REMIX por que é considerada uma arquitetura moderna de desenvolvimento web sexo',
      contactMessage: false,
    },
    {
      id: 'b',
      sentIn: '19:40',
      message:
        'Uma arquitetura moderna de desenvolvimento, vista como vanguarda na renascença de web sites estáticos, e com nome de um doce popularmente conhecido como GELEIA.',
      contactMessage: true,
    },
    {
      id: 'c',
      sentIn: '19:40',
      message:
        'Criada por Mathias Biilmann, CEO do Netlify, JAMstack é uma filosofia de criação de sites estáticos que insere conceitos e práticas específicas dentro de um ecossistema tecnológico.',
      contactMessage: false,
    },
    {
      id: 'd',
      sentIn: '19:40',
      message:
        'O objetivo de Mathias, apesar de diversas justificativas técnicas, era tornar a geração de sites estáticos legal e mainstream, novamente. Segundo ele, a arquitetura moderna da JAMstack:',
      contactMessage: false,
    },
    {
      id: 'e',
      sentIn: '19:40',
      message:
        'não é sobre tecnologias específicas. É um novo jeito de criar websites e aplicativos que entreguem melhor performance, alta segurança, baixo custo de escalabilidade, e experiência de desenvolvimento',
      contactMessage: true,
    },
    {
      id: 'f',
      sentIn: '19:40',
      message:
        'A base de toda estrutura JAM está na geleia do nome: JAM = JavaScript, APIs e Markup.',
      contactMessage: true,
    },
    {
      id: 'g',
      sentIn: '19:40',
      message:
        'JavaScript, obviamente, é o componente responsável em popularizar a arquitetura. A linguagem é amplamente utilizada no mercado de desenvolvimento web. Em poucas palavras: JavaScript é o que providencia todas as funcionalidades dinâmicas e interativas para o sistema, sem restrições de frameworks (React, Vue, Angular, Svelte e afins)',
      contactMessage: false,
    },
    {
      id: 'h',
      sentIn: '19:40',
      message:
        'Todas as funções do servidor, ou banco de dados, são manuseadas por APIs reutilizáveis, acessadas por HTTPS com JS.',
      contactMessage: true,
    },
    {
      id: 'i',
      sentIn: '19:40',
      message:
        'Markup é o arquivo estático gerado por ferramentas de desenvolvimento de páginas web, como NextJS, Gatsby ou Create-React-App.',
      contactMessage: true,
    },
    {
      id: 'o',
      sentIn: '19:40',
      message:
        'Em linhas gerais, numa definição bem abrangente, são sites desenvolvidos sem a dependência de um servidor.',
      contactMessage: true,
    },
  ]);

  const [messages2, setMessages2] = useState<Message[]>();

  const { user } = useAuth();

  const {
    currentConversation: { data: contact },
  } = useConversations();

  const { searchText } = useSearchInConversation();
  const { isOpen: conversationPopoverIsOpen } = useConversationPopover();

  useEffect(() => {
    async function getMessages() {
      if (!user?.uid) return;

      const conversationsRef = query(
        collection(db, 'conversations'),
        where('usersParticipating', 'array-contains', user.uid)
      );

      const conversationsSnap = await getDocs(conversationsRef);

      if (conversationsSnap.empty || !contact?.uid) return;

      const currentConversationDoc = conversationsSnap.docs.find((doc) => {
        const docData = doc.data() as ConversationDocWithContactData;

        return docData?.users.includes(contact.uid);
      });

      const currentConversationDocId = currentConversationDoc?.id as string;

      const messagesRef = collection(
        db,
        'conversations',
        currentConversationDocId,
        'messages'
      );

      const messageDocs = await getDocs(messagesRef);

      const { formatMessageSentIn } = await import(
        '../../../../utils/formatDate'
      );

      const messagesFormatted = messageDocs.docs.map((message) => {
        const messageData = message.data() as DbMessageData;

        return {
          id: message.id,
          message: messageData.message,
          contactMessage: messageData.author !== user.uid,
          sentIn: formatMessageSentIn(messageData.sentIn),
        };
      });

      setMessages2(messagesFormatted);
    }

    getMessages();
  }, [user?.uid, contact?.uid]);

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const padding = useBreakpointValue([14, 17, 20]) ?? 0;

  const messageVirtualizer = useVirtual({
    size: messages.length,
    parentRef: scrollBoxRef,
    paddingEnd: padding,
    paddingStart: padding,
  });

  const scrollToIndex = useCallback((index: number) => {
    messageVirtualizer.scrollToIndex(index, {
      align: 'center',
    });
  }, []);

  useEffect(() => {
    if (!conversationPopoverIsOpen || !searchText) return;

    function searchInConversation() {
      const searchWordMessageIndex = messages.findIndex(({ message }) =>
        message.toLowerCase().includes(searchText)
      );

      const conditions = {
        searchTextNotFound: searchWordMessageIndex === -1,
      };

      if (conditions.searchTextNotFound) return;

      scrollToIndex(searchWordMessageIndex);
    }

    searchInConversation();
  }, [searchText, messages, conversationPopoverIsOpen, scrollToIndex]);

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      setTimeout(() => {
        scrollToIndex(10);
      }, 1);

      setInitial(false);
    } else {
      scrollToIndex(10);
    }
  }, [messages2, scrollToIndex, initial]);

  return (
    <Box
      ref={scrollBoxRef}
      overflowY='auto'
      pr={['14px', '17px', '20px']}
      mr={['-14px', '-17px', '-20px']}
    >
      <Box h={messageVirtualizer.totalSize} w='100%' pos='relative'>
        {messageVirtualizer.virtualItems.map((virtualMessage) => {
          const message = messages[virtualMessage.index];

          return (
            <Box
              key={virtualMessage.index}
              ref={virtualMessage.measureRef}
              pos='absolute'
              top={0}
              left={0}
              w='100%'
              transform={`translateY(${virtualMessage.start}px)`}
            >
              <Message
                messageIndex={virtualMessage.index}
                contactMessage={message.contactMessage}
                message={message.message}
                sentIn={message.sentIn}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
