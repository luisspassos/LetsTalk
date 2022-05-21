import { OnlineAt } from '../types';

export function formatDate(date: Date) {
  function isToday() {
    const today = new Date();
    return (
      date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    );
  }

  const dateInArray = date.toLocaleString('pt-br').split(' ');

  dateInArray[1] = dateInArray[1].slice(0, 5);

  return { dateInArray, isToday: isToday() };
}

export function formatContactsUpdatedAt(updatedAt: number) {
  const {
    dateInArray: [date, hours],
    isToday,
  } = formatDate(new Date(updatedAt));

  if (isToday) {
    return hours;
  } else {
    return date;
  }
}

export function formatContactOnlineAt(onlineAt: OnlineAt) {
  if (onlineAt === 'now') {
    return 'online';
  }

  const {
    dateInArray: [date, hours],
    isToday,
  } = formatDate(new Date(onlineAt));

  if (isToday) {
    return `Hoje ás ${hours}`;
  } else {
    return `${date} ás ${hours}`;
  }
}
