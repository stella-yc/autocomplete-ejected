import React, { Component } from 'react';
// import './SearchBar.css';

import JSONP from 'jsonp';
import generateSearchUrl from './utils/searchUrl';
import SearchResult from './SearchResult';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedValue: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    const typedValue = event.target.value;
    this.setState({ typedValue }, () => this.retrieveResults());
  }

  retrieveResults () {
    const { typedValue } = this.state;
    const api = generateSearchUrl(typedValue);
    JSONP(api, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        let results;
        if (data.results.length > 10) {
          results = [];
          for (let i = 0; i < 10; i++) {
            results.push(data.results[i]);
          }
        } else {
          results = data.results;
        }
        this.setState({results});
      }

    });
  }

  render() {
    return (
      <div className="Searchbar-container">
        <input
          type="text"
          placeholder="Enter a college or university..."
          onChange={this.handleChange}
          value={this.state.typedValue}
        />
        <ul className="Searchbar-results">
          {
            this.state.results.map(result =>
              <SearchResult
                result={result}
                typedValue={this.state.typedValue}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

export default SearchBar;
