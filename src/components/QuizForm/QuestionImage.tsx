import { getPrivateMediaURL } from 'utils/helpers';
import React from 'react';

export const QuestionImage = ({ path }: { path?: string }) => {
  return path && path.length ? (
    <div>
      <img src={getPrivateMediaURL(path)} alt="Question illustration" />
    </div>
  ) : null;
};
