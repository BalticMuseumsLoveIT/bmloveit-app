import { getPrivateMediaURL } from 'utils/helpers';
import { FormImage } from 'components/Page/Page.style';
import React from 'react';

export const QuestionImage = ({
  path,
  alt,
}: {
  path?: string;
  alt?: string;
}) => {
  return path && path.length ? (
    <FormImage src={getPrivateMediaURL(path)} alt={alt || ''} />
  ) : null;
};
