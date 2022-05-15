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

type ConversationDocWithContactData =
  | {
      users: ConversationUsersId;
      usersParticipating: [string] | ConversationUsersId;
    }
  | undefined;

type FullConversationDocData = {
  users: ConversationUsersId;
  usersParticipating: ConversationUsersId | [string];
};

type FullConversationDoc = {
  id: string;
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

          if (!contactExists || contactName === user.username) {
            setError('contactName', {
              message:
                'Não foi possível adicionar este usuário, talvez ele não exista',
            });

            return;
          }

          const { addDoc, collection, query, where, getDocs } = await import(
            'firebase/firestore'
          );

          const conversationsRef = collection(db, 'conversations');

          const conversationUsersId = [user.uid, contactUserData.uid];

          const userConversationsRef = query(
            conversationsRef,
            where('users', 'array-contains', user.uid)
          );
          const userConversationsSnap = async () =>
            await getDocs(userConversationsRef);

          const conversationDocWithContact = (
            await userConversationsSnap()
          ).docs.find((doc) => {
            const docData = doc.data() as ConversationDocWithContactData;

            return docData?.users.includes(contactUserData.uid);
          });

          const conversationDocWithContactData =
            conversationDocWithContact?.data() as ConversationDocWithContactData;

          const contactExistsInConversationList =
            conversationDocWithContactData?.usersParticipating.some(
              (usersParticipating) => usersParticipating === user.uid
            );

          if (contactExistsInConversationList) {
            setError('contactName', {
              message: 'Este contato já existe',
            });
            return;
          }

          const addContactToConversationList = async (updatedAt: number) => {
            const { api } = await import('../../../../services/api');
            const { formatContactsUpdatedAt } = await import(
              '../../../../utils/formatDate'
            );

            const [{ displayName, photoURL, uid }] = (
              await api.get<ContactsResponse>(
                `getUsers?usersId=${contactUserData.uid}`
              )
            ).data.users;

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

            onClose();
            resetForm();
          };

          if (conversationDocWithContact?.exists) {
            const { updateDoc, arrayUnion } = await import(
              'firebase/firestore'
            );

            await updateDoc(conversationDocWithContact.ref, {
              usersParticipating: arrayUnion(user.uid),
            });

            const updatedAtOfUser = Date.now();

            await addContactToConversationList(updatedAtOfUser);

            return;
          }

          const { setDoc } = await import('firebase/firestore');

          await addDoc(conversationsRef, {
            users: conversationUsersId,
            usersParticipating: [user.uid],
          });

          const fullConversationDoc = (await userConversationsSnap()).docs.find(
            (doc) => {
              const docData = doc.data() as FullConversationDocData;

              return docData.users.includes(contactUserData.uid);
            }
          ) as FullConversationDoc;

          const fullConversationDocId = fullConversationDoc.id;

          const updatedAtOfUsers = Date.now();

          const usersInformationSetDocPromises = conversationUsersId.map(
            (id) => {
              const conversationDocumentRef = doc(
                db,
                'conversations',
                fullConversationDocId,
                'usersInformation',
                id
              );

              return setDoc(conversationDocumentRef, {
                updatedAt: updatedAtOfUsers,
              });
            }
          );

          await Promise.all(usersInformationSetDocPromises);

          await addContactToConversationList(updatedAtOfUsers);
        } catch (err) {
          const { unknownErrorToast } = await import(
            '../../../../utils/Toasts/unknownErrorToast'
          );

          unknownErrorToast();
        }
      }),
    [handleSubmit, onClose, resetForm, setError, user, setConversations]
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
