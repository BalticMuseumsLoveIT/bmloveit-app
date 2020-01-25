import { DomElement } from 'htmlparser2';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes } from 'react-html-parser';
import React from 'react';

interface ItemHtmlParserProps {
  html: string;
}

export const ItemHtmlParser = ({ html }: ItemHtmlParserProps) => {
  const transform = (node: DomElement) => {
    if (node.type === 'tag' && node.name === 'a') {
      return (
        <Link to={(node.attribs && node.attribs.href) || ''}>
          {processNodes(node.children || [], transform)}
        </Link>
      );
    }
  };

  return <>{ReactHtmlParser(html, { transform: transform })}</>;
};
