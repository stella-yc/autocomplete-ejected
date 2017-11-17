import React, { Component } from 'react';
import SearchBar from './SearchBar';
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
    return (
      <div>
        <button
          onClick={this.toggleStyle}
          className="SearchToggle-button"
          >
          Toggle Style
        </button>
        <SearchBar
          style={this.state.style}
        />
      </div>
    );
  }
}

export default StyleToggle;
