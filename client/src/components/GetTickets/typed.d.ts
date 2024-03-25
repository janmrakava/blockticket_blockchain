interface EventBannerProps {
  eventImg: string;
  eventName: string;
  date: string;
  place: string;
  city: string;
}

interface ITickets {
  category: string[];
  prices: {
    USD: number;
    EUR: number;
    CZK: number;
  };
  eventId: string;
  ticket_name: {
    cs: string;
    en: string;
  };
  quantity: number;
  sold: number;
}

interface ITicketsProps {
  imageSrc: string;
  name: {
    cs: string;
    en: string;
  };
  nameOfPlace: string;
  city: string;
  date: string;
  ticketTypes: ITickets[];
  eventId: string;
}

interface CartState {
  tickets: Record<string, Record<string, number>>;
}
