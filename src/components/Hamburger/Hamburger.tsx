import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import { inject, observer } from 'mobx-react';
import StyledWrapper, { InnerHamburger } from './Hamburger.style';

interface Props {
  uiStore?: UiStore;
}

@inject('uiStore')
@observer
class Hamburger extends React.Component<Props> {
  public render() {
    return (
      <StyledWrapper onClick={() => this.props.uiStore!.toggleIsMenuOpened()}>
        <InnerHamburger />
      </StyledWrapper>
    );
  }
}

export default Hamburger;
