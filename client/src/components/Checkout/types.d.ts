interface IPaymentBannerProps {
  type: string;
  active: boolean;
  onClick: (type: string) => void;
}
interface IContactDetailProps {
  firstName: string;
  lastName: string;
  email: string;
  telNumber: string;
}
interface IEventBannerCheckoutProps {
  artist: {
    cs: string;
    en: string;
  };
  imgSrc: string;
  prices: {
    USD: number;
    EUR: number;
    CZK: number;
  };
  typeTicket: string;
  quantity: number;
}
interface IPayBannerProps {
  type: string;
}
interface IBankBannerProps {
  name: string;
  imgSrc: string;
  active: boolean;
  onClick: (bankname: string) => void;
}
interface ICardData {
  value: string;
  isValid: boolean;
}
