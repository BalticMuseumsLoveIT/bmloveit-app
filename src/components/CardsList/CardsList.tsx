import ItemStore from 'utils/store/itemStore';
import {
  Card,
  CardIcon,
  CardList,
  CardListItem,
} from 'components/CardsList/CardList.style';
import { getPrivateMediaURL } from 'utils/helpers';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Subtitle } from 'components/Page/Page.style';

export interface Props {
  cards: Array<ItemStore>;
}

const CardsList = ({ cards }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  const userHaveCards = cards.length > 0;

  return userHaveCards && ready ? (
    <>
      <Subtitle>{t('cards.header', 'Cards')}:</Subtitle>
      <CardList>
        {cards.map(card => (
          <CardListItem key={card.itemId}>
            <Card to={`?popup=${card.itemId}`} title={card.itemNameFull}>
              <CardIcon
                src={
                  card.itemIcon
                    ? getPrivateMediaURL(card.itemIcon.file_url)
                    : '/images/card-icon-placeholder.svg'
                }
                alt={card.itemNameFull}
              />
            </Card>
          </CardListItem>
        ))}
      </CardList>
    </>
  ) : null;
};

export default CardsList;
