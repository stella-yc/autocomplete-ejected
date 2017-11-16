import JSONP from 'jsonp';

const promiseJSONP = (url) =>
  new Promise((resolve, reject) => {
    JSONP(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
});

export default promiseJSONP;
