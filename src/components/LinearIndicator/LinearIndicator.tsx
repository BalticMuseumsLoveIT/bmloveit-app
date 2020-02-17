import { Indicator } from 'components/LinearIndicator/LinearProgress.style';
import { useLocalStore, useObserver } from 'mobx-react';
import React, { useEffect } from 'react';
import { action } from 'mobx';

export const LinearIndicator = () => {
  const store = useLocalStore(() => ({
    shouldDisplayIndicator: false,
    setShouldDisplayIndicator: action((shouldDisplayIndicator: boolean) => {
      store.shouldDisplayIndicator = shouldDisplayIndicator;
    }),
  }));

  useEffect(() => {
    store.setShouldDisplayIndicator(false);

    const timer = setTimeout(() => {
      store.setShouldDisplayIndicator(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [store]);

  return useObserver(() =>
    store.shouldDisplayIndicator ? <Indicator indeterminate={true} /> : null,
  );
};
