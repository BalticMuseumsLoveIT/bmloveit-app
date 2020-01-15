import StyledWrapper from 'components/Footer/Footer.style';
import React from 'react';

interface Props {}

const Footer = (props: React.PropsWithChildren<Props>) => {
  return <StyledWrapper>{props.children}</StyledWrapper>;
};

export default Footer;
