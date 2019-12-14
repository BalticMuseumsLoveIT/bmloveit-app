import React from 'react';

export const QuestionImage = ({ url }: { url?: string }) => {
  return url && url.length ? (
    <div>
      <img src={url} alt="Question illustration" />
    </div>
  ) : null;
};
