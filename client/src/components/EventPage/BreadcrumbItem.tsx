/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Separator } from '../../styles/eventStyles';
import { FormattedMessage } from 'react-intl';

interface IBreadcrumbItemProps {
  to: string;
  label: string;
  isLast: boolean;
}

const BreadcrumbItem: React.FC<IBreadcrumbItemProps> = ({ to, label, isLast }) => {
  return (
    <>
      {!isLast ? (
        <Link style={{ textDecoration: 'none', color: '#fff' }} to={to}>
          <FormattedMessage id={`app.breadcrumb.${label}`} />
        </Link>
      ) : (
        <Link style={{ textDecoration: 'none', color: '#fff' }} to={to}>
          {label === 'category' ? <FormattedMessage id={`app.breadcrumb.${label}`} /> : label}
        </Link>
      )}

      {!isLast && <Separator>|</Separator>}
    </>
  );
};

export default BreadcrumbItem;
