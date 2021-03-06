import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'components/common/Card/Card';
import { FormItem, Title } from '@app/components/common/Form/Form.styles';
import { CreditCard } from './paymentForm/interfaces';
import { useResponsive } from 'hooks/useResponsive';
import { cards as initialCards } from '@app/constants/cards';
import { PaymentCardsWidget } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentMethod/PaymentCardsWidget';

export const PaymentMethod: React.FC = () => {
  const { t } = useTranslation();

  const [cards, setCards] = useState<CreditCard[]>(initialCards);

  const { isTablet } = useResponsive();

  const handleCardRemove = (cardNumber: string) => setCards(cards.filter((card) => card.number !== cardNumber));

  const handleCardAdd = (card: CreditCard) => {
    setCards([...cards, card]);
  };

  const content = (
    <>
      <FormItem>
        <Title>{t('profile.nav.payments.paymentMethod')}</Title>
      </FormItem>
      <PaymentCardsWidget cards={cards} onCardRemove={handleCardRemove} onCardAdd={handleCardAdd} />
    </>
  );

  return isTablet ? content : <Card>{content}</Card>;
};
