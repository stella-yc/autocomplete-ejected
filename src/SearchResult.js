import React, { Component } from 'react';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.bindElement = this.bindElement.bind(this);
    this.navigateToLink = this.navigateToLink.bind(this);
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

  boldMatchingText (highlight, text) {
    const startIdx = this.substringIdx(highlight, text);
    if (startIdx === -1) {
      return (
        <span>{text}</span>
      );
    }
    return this.formattedElement(text, startIdx, startIdx + highlight.length);
  }

  navigateToLink (selected, goToLink) {
    this.link.click();
  }

  bindElement (el) {
    this.link = el;
    const { selected, goToLink } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && nextProps.goToLink) {
      this.navigateToLink(nextProps.selected, nextProps.goToLink);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.goToLink && !nextProps.selected) {
      return false;
    } else {
      return true;
    }
  }

  render () {
    const { typedValue, result, selected, goToLink } = this.props;
    const { name, url, location, id } = result;
    return (
      <li className={`SearchResult ${selected ? 'SearchResult-selected' : ''}`}>
        <a
          ref={this.bindElement}
          href={url} >
          { this.boldMatchingText(typedValue, name) }
          <small>{location}</small>
        </a>
      </li>
    );
  }
}

export default SearchResult;
