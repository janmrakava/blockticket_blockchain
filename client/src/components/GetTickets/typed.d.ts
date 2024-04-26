interface EventBannerProps {
  eventImg: string;
  eventName: string;
  date: string;
  place: string;
}

interface ITicketsProps {
  ticketPrice: number;
  ticketsLeft: number;
  eventID: string;
}

interface CartState {
  tickets: Record<string, Record<string, number>>;
}
