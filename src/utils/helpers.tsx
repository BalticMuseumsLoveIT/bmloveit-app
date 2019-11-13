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
