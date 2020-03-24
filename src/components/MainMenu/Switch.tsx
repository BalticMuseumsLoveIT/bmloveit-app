import { Button, Hamburger } from 'components/MainMenu/Switch.style';
import { UiStore } from 'utils/store/uiStore';
import { inject, observer } from 'mobx-react';
import React from 'react';

interface Props {}

interface InjectedProps extends Props {
  uiStore: UiStore;
}

export const Switch = inject('uiStore')(
  observer((props: Props) => {
    const injected = props as InjectedProps;

    const { toggle, isOpened } = injected.uiStore.nav;

    return (
      <Button onClick={toggle}>
        <Hamburger isOpened={isOpened} />
      </Button>
    );
  }),
);
