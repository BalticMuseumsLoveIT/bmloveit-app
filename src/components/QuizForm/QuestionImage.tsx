import Api from 'utils/api';
import React from 'react';

export const QuestionImage = ({ path }: { path?: string }) => {
  return path && path.length ? (
    <div>
      <img src={Api.getPrivateMedia(path)} alt="Question illustration" />
    </div>
  ) : null;
};
