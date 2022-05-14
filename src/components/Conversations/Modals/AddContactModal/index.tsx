import { Buttons } from '../../../Modal/Button/Buttons';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import { useAddContactModal } from '../../../../contexts/Modal/AddContactModalContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { UserInput } from './UserInput';
import { ModalFormControl } from '../../../Modal/ModalFormControl';
import { regexs } from '../../../../utils/regexs';
import {
  ContactsResponse,
  ConversationUsersId,
} from '../../../../utils/getConversations';
import { useConversations } from '../../../../contexts/ConversationsContext';

export type AddContactFormData = {
  contactName: string;
};

type ContactUserData = {
  uid: string;
};

type ContactConversationDoc = {
  whoAdded: string;
  users: ConversationUsersId;
};

const addContactFormSchema = yup.object().shape({
  contactName: yup
    .string()
    .trim()
    .required('Usuário obrigatório')
    .matches(
      regexs.fullUsername,
      'O usuário deve seguir este formato: usuario#1234'
    ),
});
export function AddContactModal() {
  const {
    register,
    handleSubmit,
    setError,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<AddContactFormData>({
    resolver: yupResolver(addContactFormSchema),
  });

  const { isOpen, onClose } = useAddContactModal();
  const { user } = useAuth();
  const {
    conversations: { setConversations },
  } = useConversations();

  const handleAddContact = useMemo(
    () =>
      handleSubmit(async ({ contactName }) => {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('../../../../services/firebase');

          const contactUserRef = doc(db, 'users', contactName);
          const contactUserSnap = await getDoc(contactUserRef);
          const contactUserData = contactUserSnap.data() as ContactUserData;

          const contactExists = contactUserSnap.exists();

          if (
            user?.username &&
            contactExists &&
            contactName !== user.username
          ) {
            const { addDoc, collection, query, where, getDocs } = await import(
              'firebase/firestore'
            );

            const conversationsRef = collection(db, 'conversations');

            const conversationUsersId = [user.uid, contactUserData.uid];

            const conversationRef = query(
              conversationsRef,
              where('users', 'array-contains', user.uid)
            );
            const conversationSnap = async () => await getDocs(conversationRef);

            const contactConversationDoc = (await conversationSnap()).docs.find(
              (doc) => {
                const docData = doc.data() as ContactConversationDoc;

                return docData.users.includes(contactUserData.uid);
              }
            );

            const contactConversationDocData =
              contactConversationDoc?.data() as ContactConversationDoc;

            const currentUserAdded =
              contactConversationDocData.whoAdded === user.uid;

            const existMessages;

            if (contactConversationDoc) {
              setError('contactName', {
                message: 'Este contato já existe',
              });
              return;
            }

            const { setDoc } = await import('firebase/firestore');

            await addDoc(conversationsRef, {
              users: conversationUsersId,
              whoAdded: user.uid,
            });

            const conversationDocumentId = (await conversationSnap()).docs[0]
              .id;

            const updatedAt = Date.now();

            await Promise.all(
              conversationUsersId.map((id) => {
                const conversationDocumentRef = doc(
                  db,
                  'conversations',
                  conversationDocumentId,
                  'usersInformation',
                  id
                );

                return setDoc(conversationDocumentRef, {
                  updatedAt,
                });
              })
            );

            const addContactToConversationList = async () => {
              const { api } = await import('../../../../services/api');
              const { formatContactsUpdatedAt } = await import(
                '../../../../utils/formatDate'
              );

              const { displayName, photoURL, uid } = (
                await api.get<ContactsResponse>(
                  `getUsers?usersId=${contactUserData.uid}`
                )
              ).data.users[0];

              const contactDataFormatted = {
                name: displayName.split('#')[0],
                photoURL: photoURL ?? null,
                uid,
                updatedAt: formatContactsUpdatedAt(updatedAt),
              };

              setConversations((prevState) => [
                contactDataFormatted,
                ...prevState,
              ]);
            };

            await addContactToConversationList();
            onClose();
            resetForm();
          } else {
            setError('contactName', {
              message:
                'Não foi possível adicionar este usuário, talvez ele não exista',
            });
          }
        } catch (err) {
          const { unknownErrorToast } = await import(
            '../../../../utils/Toasts/unknownErrorToast'
          );

          unknownErrorToast();
        }
      }),
    [
      handleSubmit,
      onClose,
      resetForm,
      setError,
      user?.username,
      user?.uid,
      setConversations,
    ]
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='Adicionar contato'
    >
      <ModalFormControl>
        <UserInput errors={errors} register={register} />
        <Buttons
          confirmButtonProps={{
            onClick: handleAddContact,
            isLoading: isSubmitting,
          }}
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonText='Adicionar'
        />
      </ModalFormControl>
    </ModalWrapper>
  );
}
