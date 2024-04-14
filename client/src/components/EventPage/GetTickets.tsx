/* eslint-disable react/prop-types */
import { FormattedMessage } from 'react-intl';
import { GetTicketsContainer } from '../../pages/OneEvent/styled';
import { useNavigate } from 'react-router-dom';

interface IGetTicketsProps {
  id: string;
}

const GetTickets: React.FC<IGetTicketsProps> = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/getTickets/${id}`);
  };

  return (
    <GetTicketsContainer sx={{ maxWidth: '900px' }} onClick={handleClick}>
      <FormattedMessage id="app.oneevent.gettickets" />
      <img src="/icons_imgs/DownArrow.png" alt="Arrow Up" />
    </GetTicketsContainer>
  );
};

export default GetTickets;
