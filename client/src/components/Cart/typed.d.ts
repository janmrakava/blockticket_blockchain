interface ICartReviewItem {
  eventId: string;
  ticketType: string;
  quantity: number;
  imageSrc: string;
  name: {
    cs: string;
    en: string;
  };
  date: string;
  prices: {
    USD: number;
    EUR: number;
    CZK: number;
  };
  nameOfPlace: string;
  ticketName: {
    cs: string;
    en: string;
  };
  countPrice: (price: number) => void;
}

interface ICartStepsProps {
  active: string;
}
interface INumberStepProps {
  active: boolean;
  number: number;
}
interface ICashOutProps {
  sumPrice: number;
  discount: number;
  showButton: boolean;
}
