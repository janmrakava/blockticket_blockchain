export const countTickets = (tickets: number): string | number => {
  const ticketSoldUpdated = tickets > 1000 ? `${(tickets / 1000).toFixed(1)}K` : tickets;
  return ticketSoldUpdated;
};

export const countDate = (date: Date): string => {
  const eventDate = new Date(date);
  const goodDate = `${eventDate.getDate()}.${eventDate.getMonth() + 1}.${eventDate.getFullYear()}`;
  return goodDate;
};

export const convertToDate = (bigIntValue: string): Date => {
  const date = new Date(Number(bigIntValue));
  return date;
};
