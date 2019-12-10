import { LocationInterface } from 'utils/interfaces';
import React from 'react';
import StyledWrapper from './LocationTile.style';

interface Props {
  location: LocationInterface;
}

class LocationTile extends React.Component<Props> {
  public render() {
    const { name_full } = this.props.location;

    return <StyledWrapper>{name_full}</StyledWrapper>;
  }
}

export default LocationTile;
