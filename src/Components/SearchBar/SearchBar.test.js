import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import SearchBar from './SearchBar';
import SearchResult from '../SearchResult/SearchResult';

describe('<SearchBar /> Component', () => {

  const result = [
    { name: 'Brown',
    location: 'Providence',
    url: "brown.edu",
    id: '1'},
    { name: 'Bro',
    location: 'Broland',
    url: 'bro.edu',
    id: '2'}
  ];
  // mockFn will serve as spy/mock for retrieveSearchResults
  // mockFn must be a promise since we use .then api in SearchBar component
  // mockFn will return a promise that returns the given result
  const mockFn = () => Promise.resolve(result);

  it('renders shallowly without crashing', () => {
    shallow(
      <SearchBar
        retrieveSearchResults={mockFn}
      />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <SearchBar
        retrieveSearchResults={mockFn}
      />, div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <SearchBar
        retrieveSearchResults={mockFn}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates state when user types into input', () => {
    const wrapper = shallow(
      <SearchBar
        retrieveSearchResults={mockFn}
      />
    );
    const typed = 'brown';
    wrapper
      .find('input')
      .simulate('change', {target: { value: typed }});
    expect(wrapper.state().typedValue).toBe(typed);
  });

  it('queries api when user types into input', async () => {
    // note we are using async/await
    const wrapper = shallow(
      <SearchBar
        style="v1"
        retrieveSearchResults={mockFn}
      />
    );
    wrapper
      .find('input')
      .simulate('change', {target: { value: 'b' }});
    await mockFn // we wait for the promise to resolve first
    const wrapperResult = wrapper.state().results[0];
    // .toEqual checks deep equality of objects,
    // unlike .toBe which uses strict equality
    expect(wrapperResult).toEqual(result[0]);
  });

  it('updates state when up/down arrow key is pressed on input', async () => {
    // note we are using async/await
    const wrapper = shallow(
      <SearchBar
        style="v1"
        retrieveSearchResults={mockFn}
      />
    );
    const wrapperInput = wrapper.find('input');
    wrapperInput
      .simulate('change', {target: { value: 'b' }});
    await mockFn // we wait for the promise to resolve first

    // now we have results on state
    expect(wrapper.state().results.length).toBe(2);

    // events for up arrow and down arrow
    const eventUp = { keyCode: 38 };
    const eventDown = { keyCode: 40 };

    // simulate arrow keys
    expect(wrapper.state().selected).toBe(0);
    wrapperInput
      .simulate('keyDown', eventDown);
    expect(wrapper.state().selected).toBe(1);
    wrapperInput
      .simulate('keyDown', eventDown);
    expect(wrapper.state().selected).toBe(2);
    wrapperInput
      .simulate('keyDown', eventUp);
    expect(wrapper.state().selected).toBe(1);
  });

  it('updates state when enter key is pressed on input', async () => {
    // note we are using async/await
    const wrapper = shallow(
      <SearchBar
        style="v1"
        retrieveSearchResults={mockFn}
      />
    );
    const wrapperInput = wrapper.find('input');
    wrapperInput
      .simulate('change', {target: { value: 'b' }});
    await mockFn // we wait for the promise to resolve first

    expect(wrapper.state().navigateToSelected).toBe(false);
    const eventEnter = { keyCode: 13 };
    wrapperInput
      .simulate('keyDown', eventEnter);
    expect(wrapper.state().navigateToSelected).toBe(true);
  });

  it('if no style is provided, default to v1', () => {
    const wrapper = shallow(
      <SearchBar
        retrieveSearchResults={mockFn}
      />
    );
    expect(wrapper.find('.Searchbar-component-v1')).toHaveLength(1);
    expect(wrapper.find('.Searchbar-component-v2')).toHaveLength(0);
  });

  it('if supplied with style, classNames reflect style', () => {
    const wrapper = shallow(
      <SearchBar
        style="v2"
        retrieveSearchResults={mockFn}
      />
    );
    expect(wrapper.find('.Searchbar-component-v1')).toHaveLength(0);
    expect(wrapper.find('.Searchbar-component-v1').exists()).toBe(false);
    expect(wrapper.find('.Searchbar-component-v2')).toHaveLength(1);
  });

  it('if there are no search results, ul element is absent', () => {
    const wrapper = shallow(
      <SearchBar
        retrieveSearchResults={() => true}
      />
    );
    expect(wrapper.find('.Searchbar-results-v1')).toHaveLength(0);
    expect(wrapper.find('.Searchbar-results-v1').exists()).toBe(false);
  });

  it('if there are search results, SearchResult component(s) is present', async () => {
    // note we are using async/await
    const wrapper = mount(
      <SearchBar
        retrieveSearchResults={mockFn}
      />
    );
    const wrapperInput = wrapper.find('input');
    wrapperInput
      .simulate('change', {target: { value: 'b' }});
    await mockFn // we wait for the promise to resolve first

    expect(wrapper.find(SearchResult)).toHaveLength(0);
    expect(wrapper.find('.Searchbar-results-v1').exists()).toBe(false);

    wrapper.update(); // forces a re-render of component

    expect(wrapper.state().results).toHaveLength(2);
    expect(wrapper.find(SearchResult)).toHaveLength(2);
    expect(wrapper.find('.Searchbar-results-v1').exists()).toBe(true);
  });

})
