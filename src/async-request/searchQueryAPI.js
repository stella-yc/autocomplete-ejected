import { firstTenElements, uniqueVals, promiseJSONP } from '../utils';

const generateSearchUrl = (query) => {
  const api = 'http://niche-recruiting-autocomplete.appspot.com/search/?query=';
  return api + query;
};

const retrieveSearchResults = (query) => {
  const api = generateSearchUrl(query);
  return promiseJSONP(api)
    .then(data => {
      const uniqueResults = uniqueVals(data.results)
      const results = firstTenElements(uniqueResults);
      return results;
    })
    .catch(err => console.log(err));
};

export default retrieveSearchResults;
