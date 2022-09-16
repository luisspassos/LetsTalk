import emojiRegex from 'emoji-regex';

export const regexs = {
  cannotContainHashtag: /^(?!.*#).*$/,
  fullUsername: /^([^#])([^#]*#\d+)$/,
  emoji: emojiRegex(),
};
