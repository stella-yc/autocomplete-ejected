import React, { Component } from 'react';

import SearchBar from './SearchBar';
import retrieveSearchResults from './async-request/searchQueryAPI';
import './StyleToggle.css';

class StyleToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'v1'
    };
    this.toggleStyle = this.toggleStyle.bind(this);
  }

  toggleStyle () {
    const newStyle = this.state.style === 'v1'
    ? 'v2'
    : 'v1';
    this.setState({ style: newStyle });
  }

  render() {
    const { style } = this.state;
    return (
      <div className={`StyleToggle-${style}`}>
        <button
          onClick={this.toggleStyle}
          className={`SearchToggle-button-${style}`}
          >
          Toggle Style
        </button>
        <SearchBar
          style={style}
          retrieveSearchResults={retrieveSearchResults}
        />
      </div>
    );
  }
}

export default StyleToggle;
