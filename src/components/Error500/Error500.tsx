import { Image500 } from 'components/Error500/Error500.style';
import { Emphasize } from 'components/Page/Page.style';
import { useTranslation } from 'react-i18next';
import React from 'react';

export enum Error500Context {
  GLOBAL,
  GENERIC,
}

export interface Error500Props {
  context?: Error500Context;
}

export const Error500 = ({ context }: Error500Props) => {
  const { t, ready } = useTranslation();

  return ready ? (
    <>
      <Image500
        src="/images/500.png"
        alt={t('image.500.alt', 'General error')}
      />

      <Emphasize>
        <p>
          {(() => {
            switch (context) {
              case Error500Context.GLOBAL:
                return t(
                  'error.500.global',
                  'Sorry, there was an error while loading the app',
                );
              case Error500Context.GENERIC:
              default:
                return t(
                  'error.500.generic',
                  'Sorry, there was an error while loading the content',
                );
            }
          })()}
        </p>
      </Emphasize>
    </>
  ) : null;
};
