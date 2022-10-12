import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import i18n from '@emoji-mart/data/i18n/pt.json';

export function EmojiPicker() {
  return <Picker data={data} i18n={i18n} previewPosition='none' set='apple' />;
}
