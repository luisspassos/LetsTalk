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
