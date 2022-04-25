export function useDate(date: Date) {
  function isYesterday(date: Date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.toDateString() === date.toDateString()) {
      return true;
    }

    return false;
  }

  const dateInArray = date.toLocaleString('pt-br').split(' ');

  dateInArray[1] = dateInArray[1].slice(0, 5);

  return { dateInArray, isYesterday: isYesterday(date) };
}
