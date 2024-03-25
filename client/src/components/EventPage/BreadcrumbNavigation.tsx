/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import BreadcrumbItem from './BreadcrumbItem';
interface IBreadcrumbProps {
  items: Array<{ to: string; label: string }>;
}

const BreadcrumbNavigation: React.FC<IBreadcrumbProps> = ({ items }) => {
  return (
    <Box sx={{ marginLeft: '10px', marginTop: '43px' }}>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          to={item.to}
          label={item.label}
          isLast={index === items.length - 1}
        />
      ))}
    </Box>
  );
};

export default BreadcrumbNavigation;
