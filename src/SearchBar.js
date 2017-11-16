import React, { Component } from 'react';
import './SearchBar.css';

import promiseJSONP from './utils/JSONPUtil';
import generateSearchUrl from './utils/searchUrl';
import { firstTenElements, uniqueVals } from './utils/arrayUtil';
import SearchResult from './SearchResult';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      typedValue: '',
      results: [],
      navigateToSelected: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.retrieveResults = this.retrieveResults.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInputChange (event) {
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

  handleKeyDown (event) {
    const { selected, results } = this.state;
    // if up arrow key pressed
    if (event.keyCode === 38 && selected > 0) {
      this.setState((prevState =>
        ({ selected: prevState.selected - 1 })
      ));
    }
    // if down arrow key pressed
    if (event.keyCode === 40 && selected <= results.length) {
      this.setState((prevState =>
      ({ selected: prevState.selected + 1 })
    ));
    }
    // if enter key is pressed
    if (event.keyCode === 13) {
      this.setState({navigateToSelected: true});
    }
  }

  render () {
    const { selected, typedValue, results, navigateToSelected } = this.state;
    return (
      <div className="Searchbar-container">
        <input
          className="Searchbar-input"
          type="text"
          placeholder="Enter a college or university..."
          onChange={this.handleInputChange}
          value={typedValue}
          onKeyDown={this.handleKeyDown}
        />
        <ul className="Searchbar-results">
          {
            results.map((result, idx) =>
              <SearchResult
                goToLink={navigateToSelected}
                selected={selected === (idx + 1)}
                key={result.id}
                result={result}
                typedValue={typedValue}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

export default SearchBar;
