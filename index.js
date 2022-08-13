const arr = ['🤹‍♀️'];
const arr2 = ['♾', '👁‍🗨', '🤹‍♀️'];

for (const key in arr2) {
  const arrNum = arr[key];
  const arr2Num = arr2[key];

  if (arrNum !== arr2Num) {
    arr.splice(key, 0, undefined);
  }
}

console.log(arr2.filter((char, i) => char !== arr[i]).join(''));
