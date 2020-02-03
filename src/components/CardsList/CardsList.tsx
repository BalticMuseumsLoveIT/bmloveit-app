import ItemStore from 'utils/store/itemStore';
import { useTranslation } from 'react-i18next';
import React from 'react';

export interface Props {
  cards: Array<ItemStore>;
}

const CardsList = ({ cards }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  const userHaveCards = cards.length > 0;

  return userHaveCards && ready ? (
    <>
      <h3>{t('cards.header', 'Cards')}:</h3>
      <ul>
        {cards.map(card => (
          <li key={card.itemId}>{card.itemNameFull}</li>
        ))}
      </ul>
    </>
  ) : null;
};

export default CardsList;
