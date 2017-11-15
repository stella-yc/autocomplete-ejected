const api = 'http://niche-recruiting-autocomplete.appspot.com/search/?query=';

const generateSearchUrl = (query) => {
  return api + query;
};

export default generateSearchUrl;
