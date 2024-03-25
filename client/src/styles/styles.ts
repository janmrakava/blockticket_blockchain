/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Divider, Grid, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LandingPage from '../../public/landing_3.jpeg';
import { Link } from 'react-router-dom';

export const LogoImg = styled('img')`
  width: 50px;
  height: 50px;
  margin-left: 20px;
`;

export const SocialButtonStyled = styled(Button)`
  color: #fff;
  font-size: 24px;
`;

export const LogoImgTextMedium = styled('img')`
  width: 60px;
  height: 60px;
  margin-left: 20px;
`;

export const LogoImgText = styled('img')`
  margin-left: 20px;
`;

export const HeroSection = styled(Box)`
  position: relative;
  top: -100px;
  z-index: 1;
  min-height: 852px;
  background-image: url(${LandingPage});
  background-size: cover;
  background-position: center;
`;

export const DividerThinner = styled(Divider)`
  background-color: #80797b;
  border-bottom-width: 0.1rem;
  margin-bottom: 20px;
`;
export const DividerThicker = styled(Divider)`
  background-color: #80797b;
  border-bottom-width: 3px;
`;

export const SelectCountry = styled(Select)`
  display: flex;
  gap: 20px;
  color: #fff;
`;

export const ChooseTopFlagImg = styled('img')`
  border-radius: 50%;
  width: 24px;
  margin-right: 20px;
  color: #fff;
  background: #131021;
`;
export const ChooseTypeEventButtonActive = styled(Button)`
  background: linear-gradient(90deg, rgba(2, 90, 179, 1) 0%, rgba(1, 174, 247, 1) 100%);
  color: #fff;
  border-radius: 90px;
  padding: 10px 15px;
`;

export const ChooseTypeEventButton = styled(Button)`
  color: #fff;
  font-weight: bold;
`;

export const SelectComp = styled(Select)`
  background: #131021;
  border-radius: 90px;
  background: linear-gradient(90deg, rgba(2, 90, 179, 1) 0%, rgba(1, 174, 247, 1) 100%);
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  padding: 3px 20px;
`;
export const MenuItemChooseType = styled(MenuItem)`
  display: flex;
  justify-content: center;
  color: #fff;
  background: #131021 !important;
`;

export const FavoriteBannerGridContainer = styled(Grid)`
  background: linear-gradient(90deg, rgba(2, 90, 179, 1) 0%, rgba(1, 174, 247, 1) 100%);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: block;
  ${(props) => props.theme.breakpoints.up('lg')} {
    display: flex;
  }
`;

export const TypographyFavoriteBannerHeader = styled(Typography)`
  color: #fff;
  font-weight: 900;
  font-size: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  white-space: pre-line;
`;

export const TypographyFavoriteBannerText = styled(Typography)`
  color: #fff;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 50px;
`;

export const FavoriteBannerLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
export const FavoriteBannedGridItem = styled(Grid)`
  padding: 20px;
`;
export const FooterLink = styled(FavoriteBannerLink)`
  font-size: 14px;
`;

export const GridFavoriteBannerItem = styled(Grid)`
  color: #fff;
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FavoriteBannerButton = styled(Button)`
  color: #017ccc;
  background: #fff;
  font-weight: 900;
  border-radius: 70px;
  padding: 10px 30px;
`;

export const MobileBannerTypographyHeading = styled(Typography)`
  color: #fff;
  font-weight: 900;
  font-size: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  white-space: pre-line;
  letter-spacing: 5px;
`;

export const MobileBannerTypographyText = styled(Typography)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin: 25px 0px;
`;

export const BuyMoreGridContainer = styled(Grid)`
  background: #9c114a;
  padding: 20px;
`;

export const BuyMoreGridItem = styled(Grid)`
  display: block;
  ${(props) => props.theme.breakpoints.up('lg')} {
    display: flex;
  }
`;

export const BuyMoreTypographyImg = styled(Typography)`
  text-align: center;
  margin-top: 30px;
`;

export const BuyMoreBox = styled(Box)`
  margin-right: 30%;
`;

export const BuyMoreTypographyHeading = styled(Typography)`
  color: #fff;
  font-weight: bold;
  letter-spacing: 5px;
  font-size: 30px;
  ${(props) => props.theme.breakpoints.up('md')} {
    font-size: 50px;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    font-size: 60px;
  }
`;

export const BuyMoreTypographyText = styled(Typography)`
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  margin-top: 20px;
`;

export const GridFindBanner = styled(Grid)`
  background: linear-gradient(
    90deg,
    rgba(17, 18, 39, 1) 0%,
    rgba(0, 93, 137, 1) 22%,
    rgba(0, 93, 137, 1) 50%,
    rgba(0, 93, 137, 1) 50%,
    rgba(17, 18, 39, 1) 100%
  );
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FindBannerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FindBannerBoxMargin = styled(FindBannerBox)`
  margin-left: 25px;
  ${(props) => props.theme.breakpoints.up('lg')} {
    margin-left: 10px;
  }
`;

export const FindBannerTypography = styled(Typography)`
  font-size: 25px;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.up('lg')} {
    font-size: 35px;
    font-weight: 900;
  }
`;

export const FindBannerBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up('lg')} {
    display: flex;
  }
`;
export const BoxFlexRowCenter = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SelectCompp = styled(Select)`
  font-size: ${({ type }) => (type === 'event' || type === 'time' ? '25px' : '20px')};
  font-weight: ${({ type }) => (type === 'event' || type === 'time' ? 'bold' : '500')};
  color: ${({ type }) => (type === 'event' || type === 'time' ? '#017CCC' : '#fff')};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    font-size: ${({ type }) => (type === 'event' || type === 'time' ? '35px' : '20px')};
    font-weight: ${({ type }) => (type === 'event' || type === 'time' ? '900' : '500')};
  }
`;

export const BoxFlexRow = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const FooterCopyrightTypography = styled(Typography)`
  display: flex;
  gap: 10px;
  color: #4b4958;
  justify-content: center;
`;

export const FooterItemBox = styled(Box)`
  color: #017ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

export const FooterTypographyHeading = styled(Typography)`
  color: #017ccc;
  font-weight: 900;
  font-size: 30px;
`;

export const FooterGridFlex = styled(Grid)`
  display: flex;
  color: #fff;
  justify-content: space-between;
`;

export const ChooseEventGridCenter = styled(FooterGridFlex)`
  justify-content: center;
  margin-bottom: 20px;
`;

export const ChooseEventGridCenterGap = styled(ChooseEventGridCenter)`
  gap: 10px;
`;

export const HeadingInputBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
  ${(props) => props.theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`;

export const HeadingInputTypography = styled(Typography)`
  color: #fff;
  font-weight: bold;
  font-size: 40px;
`;

export const HeadingInputMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #131021 !important;
`;

export const HamburgerMenuGridContainer = styled(Grid)`
  width: 100%;
  text-align: center;
  background-color: #131021;
  padding: 10px 20px 40px 20px;
  display: block;
  ${(props) => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`;

export const UserClickLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: #fff;
`;

export const UserClickBox = styled(Box)`
  background-color: #131021;
  padding: 20px;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 78px;
  right: 45px;
  ${(props) => props.theme.breakpoints.down('md')} {
    display: block;
  }
  max-width: 320px;
`;

export const UserClickTypography = styled(Typography)`
  font-weight: bold;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const LogoTypographyMedium = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
`;

export const LogoTypographyBig = styled(LogoTypographyMedium)`
  font-weight: 900;
  font-size: 40px;
`;

export const MenuTypography = styled(Typography)`
  display: flex;
  margin-top: 12px;
`;

export const FooterGridMargin = styled(Grid)`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

export const PopularBannerBox = styled(Box)`
  background-color: #ff0051;
  color: #fff;
  width: 180px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const PopularBannerTypography = styled(Typography)`
  font-size: 15px;
  font-weight: bold;
  margin: 10px;
`;

export const MobileEventBannerGrid = styled(Grid)`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover;
`;

export const ImageIconSize = styled('img')`
  width: 24px;
  height: auto;
  margin: 20px;
`;

export const ImageIconSizeBigger = styled('img')`
  width: 30px;
  height: auto;
  margin-left: 20px;
`;

export const TypographyBold = styled(Typography)`
  font-weight: bold;
`;

export const EventBannerGridContainer = styled(Grid)`
  background-size: cover;
  min-height: 300px;
`;

export const BoxFlexCenterSpaceBetween = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TypographyExtraBold = styled(Typography)`
  font-weight: 900;
  font-size: 30px;
  ${(props) => props.theme.breakpoints.up('xs')} {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const TypographyBoldFontSize = styled(TypographyBold)`
  font-size: 25px;
`;

export const TypographyMedium = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  ${(props) => props.theme.breakpoints.up('xs')} {
    font-size: 20px;
    font-weight: 400;
  }
`;

export const ExtendedBoxFontSize = styled(BoxFlexRowCenter)`
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
`;

export const SearchResultBox = styled(Box)`
  margin-top: 0px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
