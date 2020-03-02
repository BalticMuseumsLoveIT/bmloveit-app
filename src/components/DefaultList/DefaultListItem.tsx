import {
  DefaultListItemWrapper,
  DefaultListItemWrapperProps,
  ActionIcon,
} from 'components/DefaultList/DefaultList.style';
import React from 'react';

export interface DefaultListItemProps extends DefaultListItemWrapperProps {
  children?: React.ReactNode;
  customHeaderImageSrc?: string;
  onClick?: () => void;
}

export const DefaultListItem = ({
  children,
  customHeaderImageSrc,
  isDisabled,
  isMenuOpened,
  isHeader,
  imageUrl,
  hasIcon,
  hasThumbnail,
  ...rest
}: DefaultListItemProps) => {
  const imageSrc = isDisabled
    ? ''
    : isHeader
    ? isMenuOpened
      ? '/images/expand_less-24px.svg'
      : customHeaderImageSrc || '/images/expand_more-24px.svg'
    : '/images/chevron_right-24px.svg';

  return (
    <DefaultListItemWrapper
      isMenuOpened={isMenuOpened}
      isDisabled={isDisabled}
      isHeader={isHeader}
      hasThumbnail={
        (typeof hasThumbnail !== 'undefined' && hasThumbnail) ||
        (imageUrl && imageUrl.length > 0) ||
        false
      }
      hasIcon={
        (typeof hasIcon !== 'undefined' && hasIcon) ||
        (imageSrc && imageSrc.length > 0) ||
        false
      }
      {...rest}
    >
      {children}
      {imageSrc && <ActionIcon src={imageSrc} />}
    </DefaultListItemWrapper>
  );
};
