import { DomElement } from 'htmlparser2';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes } from 'react-html-parser';
import React from 'react';

interface ItemHtmlParserProps {
  html: string;
}

export const ItemHtmlParser = ({ html }: ItemHtmlParserProps) => {
  const anchorElement = document.createElement('a');

  const transform = (node: DomElement, index: any) => {
    if (
      node.type === 'tag' &&
      node.name === 'a' &&
      node.attribs &&
      node.attribs.hasOwnProperty('href') &&
      node.attribs.href.length > 0
    ) {
      anchorElement.href = node.attribs.href;

      const isInternalLink =
        anchorElement.hostname === window.location.hostname;

      if (!isInternalLink) return undefined;

      return (
        <Link to={node.attribs.href} key={index}>
          {processNodes(node.children || [], transform)}
        </Link>
      );
    }
  };

  return <>{ReactHtmlParser(html, { transform: transform })}</>;
};
