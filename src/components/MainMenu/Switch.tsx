import { Button, Hamburger } from 'components/MainMenu/Switch.style';
import { UiStore } from 'utils/store/uiStore';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

interface Props extends RouteComponentProps {}

interface InjectedProps extends Props {
  uiStore: UiStore;
}

const Switch = inject('uiStore')(
  observer((props: Props) => {
    const injected = props as InjectedProps;

    const {
      isOpened: menuIsOpened,
      close: closeMenu,
      open: openMenu,
    } = injected.uiStore.nav;

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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      if (mounted) return;

      const menuInQS = 'menu' in queryString.parse(props.location.search);

      if (menuInQS) {
        const removeMenuFromQS = (search: string): string => {
          const parsedQuery = queryString.parse(search);
          if ('menu' in parsedQuery) delete parsedQuery.menu;
          return queryString.stringify(parsedQuery);
        };

        const removeMenuFromLocation = (location: H.Location): H.Location => {
          const currentLocation = Object.assign({}, location);

          currentLocation.search = removeMenuFromQS(currentLocation.search);

          return currentLocation;
        };

        props.history.replace(removeMenuFromLocation(props.location));
      }

      setMounted(true);
    }, [mounted, props.history, props.location]);

    useEffect(() => {
      if (!mounted) return;

      const menuInQS = 'menu' in queryString.parse(props.location.search);

      if (menuIsOpened && !menuInQS) closeMenu();
      else if (!menuIsOpened && menuInQS) openMenu();
    }, [mounted, props.location.search, openMenu, closeMenu, menuIsOpened]);

    const toggle = () => {
      const { history, location } = props;

      if (menuIsOpened) history.goBack();
      else history.push(addMenuToLocation(location));
    };

    return (
      <Button onClick={toggle}>
        <Hamburger isOpened={menuIsOpened} />
      </Button>
    );
  }),
);

export default withRouter(Switch);
