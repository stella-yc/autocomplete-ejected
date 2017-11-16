import React, { Component } from 'react';
// import './SearchBar.css';

import promiseJSONP from './utils/JSONPUtil';
import generateSearchUrl from './utils/searchUrl';
import { firstTenElements, uniqueVals } from './utils/arrayUtil';
import SearchResult from './SearchResult';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedValue: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.retrieveResults = this.retrieveResults.bind(this);
  }

  handleChange (event) {
    const typedValue = event.target.value;
    this.setState({ typedValue }, () => this.retrieveResults());
  }

  retrieveResults () {
    const api = generateSearchUrl(this.state.typedValue);
    promiseJSONP(api)
      .then(data => {
        const uniqueResults = uniqueVals(data.results)
        const results = firstTenElements(uniqueResults);
        this.setState({results});
      })
      .catch(err => console.log(err));
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
                key={result.id}
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
