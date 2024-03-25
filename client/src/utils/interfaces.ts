interface TicketType {
  category: string[];
  ticket_name: {
    cs: string;
    en: string;
  };
  description: {
    cs: string;
    en: string;
  };
  prices: {
    USD: number;
    CZK: number;
    EUR: number;
  };
  quantity: number;
  sold: number;
}

export interface Address {
  capacity: number;
  city: string;
  country: string;
  name_of_place: string;
  street: string;
  street_number: string;
  zip_code: string;
  _id: string;
}

export interface Event {
  _id: string;
  name: any;
  category_of_event: string;
  description: {
    cs: string;
    en: string;
  };
  date_of_the_event: Date;
  date_of_start_sell_tickets: Date;
  capacity: number;
  ticket_availabiity: boolean;
  ticket_types: TicketType[];
  image: string;
  popular: boolean;
  address_id: Address;
}

export interface IUserData {
  first_name: string;
  last_name: string;
  email: string;
  tel_number?: string;
  password: string;
  date_registration?: Date;
  date_of_birth?: Date;
  gender: 'Male' | 'Female' | 'Not specified';
}
export interface Ticket {
  eventId: string;
  place: string;
  city: string;
  eventName: string;
  price: number;
  image: string;
  date: string;
  category: string;
  sector: string;
  zone: string;
  row: number;
  seat: number;
}

export interface TicketWithId extends Ticket {
  _id: string;
  event: string;
  name: string;
  ticket_category: string;
}

export interface Transaction {
  _id: string;
  price: number;
  date: Date;
  ticketIDs: string[];
  method: string;
  state: string;
}
