import React from 'react';
import { Link } from 'react-router-dom';
import { SocialButtonStyled } from '../../styles/styles';

interface ISocialButtonProps {
  type: string;
  Icon: React.ElementType | string;
}

const SocialButton: React.FC<ISocialButtonProps> = ({ type, Icon }) => {
  return (
    <Link to={`/${type}`}>
      <SocialButtonStyled>
        <Icon />
      </SocialButtonStyled>
    </Link>
  );
};

export default SocialButton;
