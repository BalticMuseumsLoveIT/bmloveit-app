import React from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper, { PrevButton, NextButton } from './LocationFooter.style';

interface Props {
  prev?: string;
  next?: string;
}

class LocationsFooter extends React.Component<Props> {
  render() {
    const { prev, next } = this.props;

    return (
      <StyledWrapper>
        {prev && (
          <PrevButton as={Link} to={prev}>
            Prev
          </PrevButton>
        )}
        {next && (
          <NextButton as={Link} to={next}>
            Next
          </NextButton>
        )}
      </StyledWrapper>
    );
  }
}

export default LocationsFooter;
