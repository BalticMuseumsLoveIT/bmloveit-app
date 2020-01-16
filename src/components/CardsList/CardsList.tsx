import React from 'react';
import { useTranslation } from 'react-i18next';

export interface Props {
  cards: Array<any>;
}

const CardsList = ({ cards }: Props) => {
  const { t } = useTranslation('profile-page');

  return (
    <>
      <h3>{t('cards.header', 'Cards')}:</h3>
      <ul>
        {cards.map(({ item_data: { id, name_full } }) => (
          <li key={id}>{name_full}</li>
        ))}
      </ul>
    </>
  );
};

export default CardsList;
