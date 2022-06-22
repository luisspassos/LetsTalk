import { OnlineAt } from '../utils/types';

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
    return `online hoje ás ${hours}`;
  } else {
    return `online em ${date} ás ${hours}`;
  }
}

export function formatMessageSentIn(sentIn: number) {
  const {
    dateInArray: [date, hours],
    isToday,
  } = formatDate(new Date(sentIn));

  if (isToday) {
    return `Hoje, ${hours}.`;
  } else {
    return `${date}, ${hours}.`;
  }
}
