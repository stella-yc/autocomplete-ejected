import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';
import renderer from 'react-test-renderer';

it('renders shallowly without crashing', () => {
  shallow(<SearchBar />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar />, div);
});

it('renders correctly', () => {
  const tree = renderer.create(
    <SearchBar />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('updates state when user types into input', () => {});

it('queries api when user types into input', () => {});

it('updates state when up arrow key is pressed on input', () => {});

it('updates state when up down key is pressed on input', () => {});

it('updates state when up enter key is pressed on input', () => {});

it('if no style is provided, default to v1', () => {});

it('if supplied with style, classNames reflect style', () => {});

it('if there are no search results, ul element is absent', () => {});

it('if there are search results, SearchResult component(s) is present', () => {});
