import { useTranslation } from 'react-i18next';
import React from 'react';

export const ItemNotFound = () => {
  const { t, ready } = useTranslation('survey-details-page');

  if (!ready) return null;

  return <p>{t('itemNotFound', 'Item with a given ID was not found')}</p>;
};
