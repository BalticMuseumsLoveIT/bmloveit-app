import React from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper from './Header.style';

class Header extends React.Component {
  public render(): React.ReactNode {
    return (
      <StyledWrapper>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/routes">Available Routes</Link>
              </li>
            </ul>
          </nav>
        </header>
      </StyledWrapper>
    );
  }
}

export default Header;
