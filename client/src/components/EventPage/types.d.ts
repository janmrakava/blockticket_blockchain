interface TicketData {
  _id: string;
  quantity: number;
  sold: number;
  category: string;
  description: {
    en: string;
    cs: string;
  };
  prices: {
    USD: number;
    CZK: number;
    EUR: number;
  };
  quantity: number;
  sold: number;
  ticket_name: {
    en: string;
    cs: string;
  };
}

interface IEvent {
  _id: string;
  name: {
    en: string;
    cs: string;
  };
  date: Date;
  place: string;
  category_of_event?: string;
  popular?: boolean;
  ticketsSold: number;
  image: string;
}
