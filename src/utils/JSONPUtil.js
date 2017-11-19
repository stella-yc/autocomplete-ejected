import JSONP from 'jsonp';

export const promiseJSONP = (url) =>
  new Promise((resolve, reject) => {
    JSONP(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
});
