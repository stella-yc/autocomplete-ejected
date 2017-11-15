import React, { Component } from 'react';
// import './SearchResult.css';

const SearchResult = (props) => {
  const { typedValue, result } = props;
  const { name, url, location, id } = result;
    return (
      <li>
        <a href={url} >
          {name}
        </a>
      </li>
    );

}

export default SearchResult;
