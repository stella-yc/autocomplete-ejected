import React, { Component } from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  const { typedValue, result, selected } = props;
  const { name, url, location, id } = result;

  const substringIdx = (sub, text) => {
    const lcSub = sub.toLowerCase();
    const lcText = text.toLowerCase();
    return lcText.indexOf(lcSub);
  };

  const formattedElement = (str, start, end) => (
    <span>
      {str.slice(0, start)}
      <strong>
      {str.slice(start, end)}
      </strong>
      {str.slice(end)}
  </span>
  );

  const boldMatchingText = (highlight, text) => {
    const startIdx = substringIdx(highlight, text);
    if (startIdx === -1) {
      return (
        <span>{text}</span>
      );
    }
    return formattedElement(text, startIdx, startIdx + highlight.length);
  };

    return (
      <li className={`SearchResult ${selected ? 'SearchResult-selected' : ''}`}>
        <a href={url} >
          { boldMatchingText(typedValue, name) }
          <small>{location}</small>
        </a>
      </li>
    );

}

export default SearchResult;
