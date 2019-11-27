export function getPrevArrayElement(
  array: Array<any>,
  element: any,
): any | undefined {
  const index = array.indexOf(element);

  if (index <= 0 || index >= array.length) {
    return undefined;
  }

  return array[index - 1];
}

export function getNextArrayElement(
  array: Array<any>,
  element: any,
): any | undefined {
  const index = array.indexOf(element);

  if (index < 0 || index >= array.length - 1) {
    return undefined;
  }

  return array[index + 1];
}

export function groupObjectsByKey(array: Array<any>, key: string): Array<any> {
  const groupedArray = array.reduce((resultObject, arrayElement) => {
    resultObject[arrayElement[key]] = resultObject[arrayElement[key]] || [];
    resultObject[arrayElement[key]].push(arrayElement);

    return resultObject;
  }, {});

  return Object.entries(groupedArray);
}

export function getItemFromStorage(key: string): string {
  return window.localStorage.getItem(key) || '';
}

export function setItemToStorage(key: string, item: any): string {
  window.localStorage.setItem(key, item);
  return getItemFromStorage(key);
}
