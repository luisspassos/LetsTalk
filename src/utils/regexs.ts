export const regexs = {
  cannotContainHashtag: /^(?!.*#).*$/,
  fullUsername: /^([^#])([^#]*#\d+)$/,
  emoji: /\p{Extended_Pictographic}/u,
};
