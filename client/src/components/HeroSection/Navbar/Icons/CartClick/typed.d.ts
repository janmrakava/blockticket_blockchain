interface ICartItemProps {
  artist: {
    cs: string;
    en: string;
  };
  imgSrc: string;
  date: string;
  ticketType: string;
  quantity: number;
}

interface ICartClick {
  isXs: boolean;
}
