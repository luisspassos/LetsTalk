import getEmojiRegex from 'emoji-regex';

const emojiRegex = getEmojiRegex();

export const regexs = {
  cannotContainHashtag: /^(?!.*#).*$/,
  fullUsername: /^([^#])([^#]*#\d+)$/,
  emoji: emojiRegex,
};
