export const countDate = (date: string): string => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const newDate = `${day}.${month}.${year}`;
  return newDate;
};

export const countTime = (date: string): string => {
  const dateObject = new Date(date);
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  const time = `${hours}:${minutes}`;
  return time;
};
