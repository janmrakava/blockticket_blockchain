import React from 'react';

import LanguageSwitcher from './LanguageSwitcher';
import Footer from './FooterSection/Footer';

import Navbar from './HeroSection/Navbar/Navbar';

interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
