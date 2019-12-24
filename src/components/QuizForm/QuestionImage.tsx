import React from 'react';

export const QuestionImage = ({ url, alt }: { url?: string; alt?: string }) => {
  return url && url.length ? (
    <div>
      <img src={url} alt={alt || ''} />
    </div>
  ) : null;
};
