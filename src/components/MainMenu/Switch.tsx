import { Button, Hamburger } from 'components/MainMenu/Switch.style';
import { UiStore } from 'utils/store/uiStore';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React, { useEffect } from 'react';

interface Props extends RouteComponentProps {}

interface InjectedProps extends Props {
  uiStore: UiStore;
}

const Switch = inject('uiStore')(
  observer((props: Props) => {
    const injected = props as InjectedProps;

    const { isOpened, close: closeMenu, open: openMenu } = injected.uiStore.nav;

    const addMenuToQS = (search: string): string => {
      const parsedQuery = queryString.parse(search);
      if (!('menu' in parsedQuery)) parsedQuery.menu = null;
      return queryString.stringify(parsedQuery);
    };

    const addMenuToLocation = (location: H.Location): H.Location => {
      const currentLocation = Object.assign({}, location);

      currentLocation.search = addMenuToQS(currentLocation.search);

      return currentLocation;
    };

    useEffect(() => {
      const parsedQuery = queryString.parse(props.location.search);

      if (isOpened && !('menu' in parsedQuery)) {
        closeMenu();
      }

      if (!isOpened && 'menu' in parsedQuery) {
        openMenu();
      }
    }, [props.location]);

    const toggle = () => {
      if (isOpened) {
        props.history.goBack();
      } else {
        props.history.push(addMenuToLocation(props.location));
      }
    };

    return (
      <Button onClick={toggle}>
        <Hamburger isOpened={isOpened} />
      </Button>
    );
  }),
);

export default withRouter(Switch);
