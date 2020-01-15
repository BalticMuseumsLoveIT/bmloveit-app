import { getPrivateMediaURL } from 'utils/helpers';
import React from 'react';

export const QuestionImage = ({
  path,
  alt,
}: {
  path?: string;
  alt?: string;
}) => {
  return path && path.length ? (
    <div>
      <img src={getPrivateMediaURL(path)} alt={alt || ''} />
    </div>
  ) : null;
};
