import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  public render(): React.ReactNode {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/available-routes">Available Routes</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
