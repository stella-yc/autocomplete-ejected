import React, { Component } from 'react';
import PropTypes from 'prop-types'

import SearchResult from '../SearchResult';
import './SearchBarV1.css';
import './SearchBarV2.css';

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
    this.visitSearchResult = this.visitSearchResult.bind(this);
  }

  handleInputChange (event) {
    const typedValue = event.target.value;
    this.setState({ typedValue }, () => this.retrieveResults());
  }

  retrieveResults () {
    this.props.retrieveSearchResults(this.state.typedValue)
      .then(results => this.setState({ results }));
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
      this.visitSearchResult();
    }
  }

  visitSearchResult () {
    if (this.state.selected === 0) {
      this.setState({
        navigateToSelected: true,
        selected: 1
      });
    } else {
      this.setState({navigateToSelected: true});
    }
  }

  render () {
    const { selected, typedValue, results, navigateToSelected } = this.state;
    let { style } = this.props;
    if (!style) {
      style = 'v1';
    }

    return (
      <div className={`Searchbar-component-${style}`}>
        <div className={`Searchbar-container-${style}`}>
          <input
            className={`Searchbar-input-${style}`}
            type="text"
            placeholder="Enter a college or university..."
            onChange={this.handleInputChange}
            value={typedValue}
            onKeyDown={this.handleKeyDown}
          />
          <span
            className={`Searchbar-icon-${style}`}
            onClick={this.visitSearchResult}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        {
          !results.length
            ? null
            : <ul className={`Searchbar-results-${style}`}>
              {
                results.map((result, idx) =>
                  <SearchResult
                    style={style}
                    goToLink={navigateToSelected}
                    selected={selected === (idx + 1)}
                    key={result.id}
                    result={result}
                    typedValue={typedValue}
                  />
                )
              }
            </ul>
        }
      </div>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  style: PropTypes.oneOf(['v1', 'v2']),
  retrieveSearchResults: PropTypes.func.isRequired
};
