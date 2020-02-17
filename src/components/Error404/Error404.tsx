import { Emphasize } from 'components/Page/Page.style';
import { Image404, Info } from 'components/Error404/Error404.style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export enum Error404Context {
  GLOBAL,
  ITEM,
  MODAL,
  QUIZ,
  SURVEY,
}

export interface Error404Props {
  context?: Error404Context;
}

export const Error404 = ({ context }: Error404Props) => {
  const { t, ready } = useTranslation();

  return ready ? (
    <>
      <Image404 src="/images/404.png" alt={t('image.404.alt', 'Not found')} />

      <Emphasize>
        <p>
          {(() => {
            switch (context) {
              case Error404Context.MODAL:
                return t(
                  'error.404.modal',
                  'Sorry, content of this modal was not found',
                );
              case Error404Context.ITEM:
                return t(
                  'error.404.item',
                  'Sorry, item with a given id was not found',
                );
              case Error404Context.QUIZ:
                return t(
                  'error.404.quiz',
                  'Sorry, quiz with a given id was not found',
                );
              case Error404Context.SURVEY:
                return t(
                  'error.404.survey',
                  'Sorry, survey with a given id was not found',
                );
              case Error404Context.GLOBAL:
              default:
                return t(
                  'error.404.global',
                  'Sorry, page with a given address was not found',
                );
            }
          })()}
        </p>
      </Emphasize>

      {context === Error404Context.GLOBAL && (
        <Info>
          <p>
            <Link to="/">{t('mainMenu.home', 'Homepage')}</Link>
            {' | '}
            <Link to="/about">{t('mainMenu.about', 'About app')}</Link>
          </p>
        </Info>
      )}
    </>
  ) : null;
};
