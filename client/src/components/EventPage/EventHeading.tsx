import { EventHeadingBox, EventHeadingTypography } from '../../styles/eventStyles';

/* eslint-disable react/prop-types */
interface IEventHeadingProps {
  eventName: string;
}

const EventHeading: React.FC<IEventHeadingProps> = ({ eventName }) => {
  const windowWidth = window.innerWidth;
  const repeatCount = Math.ceil(windowWidth / eventName.length);
  const repeatedTextArray = Array(repeatCount).fill(eventName);
  const repeatedText = repeatedTextArray.join(' * ');
  return (
    <EventHeadingBox>
      <EventHeadingTypography>{repeatedText}</EventHeadingTypography>
    </EventHeadingBox>
  );
};
export default EventHeading;
