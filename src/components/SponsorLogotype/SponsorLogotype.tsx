import {
  Image,
  Wrapper,
} from 'components/SponsorLogotype/SponsorLogotype.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SponsorLogotype = () => {
  const { t, ready } = useTranslation('app');

  const baltic = t('image.logoBaltic.alt', 'Baltic');
  const circle = t('image.logoCircle.alt', 'Circle');
  const interreg = t('image.logoInterreg.alt', 'Interreg');

  return ready ? (
    <Wrapper>
      <Image src="/images/logo-baltic.png" alt={baltic} title={baltic} />
      <Image src="/images/logo-circle.png" alt={circle} title={circle} />
      <Image src="/images/logo-interreg.png" alt={interreg} title={interreg} />
    </Wrapper>
  ) : null;
};
