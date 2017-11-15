import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Enter a college or university..."/>
      </div>
    );
  }
}

export default SearchBar;
