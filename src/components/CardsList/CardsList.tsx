import ItemStore from 'utils/store/itemStore';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Link } from 'react-router-dom';

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
          <li key={card.itemId}>
            <Link to={`?popup=${card.itemId}`}>{card.itemNameFull}</Link>
          </li>
        ))}
      </ul>
    </>
  ) : null;
};

export default CardsList;
