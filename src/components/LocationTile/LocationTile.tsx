import { LocationInterface } from 'utils/@types/interfaces';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper, { StyledLink } from './LocationTile.style';

interface Props {
  location: LocationInterface;
}

class LocationTile extends React.Component<Props> {
  public render(): React.ReactNode {
    const { id, name_full } = this.props.location;
    return (
      <StyledWrapper>
        <StyledLink as={Link} to={`/locations/${id}`}>
          {name_full}
        </StyledLink>
      </StyledWrapper>
    );
  }
}

export default LocationTile;
