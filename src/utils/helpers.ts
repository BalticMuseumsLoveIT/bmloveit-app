export const getPrevArrayElement = (
  array: Array<any>,
  currentElement: any,
): any | undefined => {
  const index = array.indexOf(currentElement);

  if (index <= 0 || index >= array.length) {
    return undefined;
  }

  return array[index - 1];
};

export const getNextArrayElement = (
  array: Array<any>,
  currentElement: any,
): any | undefined => {
  const index = array.indexOf(currentElement);

  if (index < 0 || index >= array.length - 1) {
    return undefined;
  }

  return array[index + 1];
};

export const groupObjectsByKey = (
  array: Array<any>,
  key: string,
): Array<any> => {
  const groupedArray = array.reduce((resultObject, arrayElement) => {
    resultObject[arrayElement[key]] = resultObject[arrayElement[key]] || [];
    resultObject[arrayElement[key]].push(arrayElement);

    return resultObject;
  }, {});

  return Object.entries(groupedArray);
};

export const getItemFromStorage = (key: string): string => {
  return window.localStorage.getItem(key) || '';
};

export const setItemToStorage = (key: string, item: any): string => {
  window.localStorage.setItem(key, item);
  return getItemFromStorage(key);
};

export const getPrivateMediaURL = (path: string): string => {
  const domain = process.env.REACT_APP_PRIVATE_MEDIA_URL || '';
  let privateMediaURL = `${domain}/${path}`;

  // Remove double slashes
  privateMediaURL = privateMediaURL.replace(/([^:]\/)\/+/g, '$1');

  return privateMediaURL;
};

/**
 * For testing purposes
 * Usage: await sleep(1000);
 * @param m milliseconds
 */
export const sleep = (m: number) => new Promise(r => setTimeout(r, m));
