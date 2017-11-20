import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchResultV1.css';
import './SearchResultV2.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.bindElement = this.bindElement.bind(this);
    this.navigateToLink = this.navigateToLink.bind(this);
  }

  //highlight portion of result name that matches typedValue
  boldMatchingText (highlight, text) {
    const startIdx = this.substringIdx(highlight, text);
    if (startIdx === -1) {
      return (
        <span>{text}</span>
      );
    }
    return this.formattedElement(text, startIdx, startIdx + highlight.length);
  }

  substringIdx (sub, text) {
    const lcSub = sub.toLowerCase();
    const lcText = text.toLowerCase();
    return lcText.indexOf(lcSub);
  }

  formattedElement (str, start, end) {
    return (
    <span>
      {str.slice(0, start)}
      <strong>
      {str.slice(start, end)}
      </strong>
      {str.slice(end)}
  </span>
  )}

  // passed to ref "escape hatch"
  bindElement (el) {
    this.link = el;
    const { selected, goToLink } = this.props;
  }

  // allows us to programmatically click on a link
  navigateToLink (selected, goToLink) {
    this.link.click();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected && nextProps.goToLink) {
      this.navigateToLink(nextProps.selected, nextProps.goToLink);
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.goToLink && !nextProps.selected) {
      return false;
    } else {
      return true;
    }
  }

  render () {
    const { typedValue, result, selected, goToLink, style } = this.props;
    const { name, url, location } = result;
    return (
      <li
        className={
          `SearchResult-${style}
          ${selected ? `SearchResult-selected-${style}` : ''}`
        }
      >
        <a
          ref={this.bindElement}
          href={url} >
          {
            this.boldMatchingText(typedValue, name)
          }
          <small
            className={
              `SearchResult-small-${style}
              ${selected ? `SearchResult-small-selected-${style}` : ''}`
            }
          >
            { location }
          </small>
        </a>
      </li>
    );
  }
}

export default SearchResult;

SearchResult.propTypes = {
  style: PropTypes.oneOf(['v1', 'v2']),
  goToLink: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  result: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    location: PropTypes.string,
    id: PropTypes.string
  }),
  typedValue: PropTypes.string.isRequired
};

