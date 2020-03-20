import {
  CommonApiTranslationInterface,
  MainMenuInterface,
  MainMenuPatchedInterface,
  ResourceDataInterface,
  ResourceTypeName,
} from 'utils/interfaces';
import stores from 'utils/store/stores';
import ISO6391 from 'iso-639-1';

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

/**
 * Convert language code to ISO 639-1 standard (2 char)
 *
 * @param languageCode
 * @return ISO 639-1 code or empty string on error
 */
export const toISO6391 = (languageCode: string): string => {
  const languageCodeISO6391 = languageCode.toLowerCase().slice(0, 2);
  const isLanguageCodeValid = ISO6391.validate(languageCodeISO6391);

  return isLanguageCodeValid ? languageCodeISO6391 : '';
};

export const getTranslatedString = (
  fallback: string,
  translations: Array<CommonApiTranslationInterface>,
): string => {
  const {
    uiStore: { languageId },
  } = stores;

  if (Number.isNaN(languageId) || translations.length === 0) return fallback;

  const translationData = translations.find(
    languageData => languageData.language === languageId,
  );

  return translationData ? translationData.text : fallback;
};

/**
 * Get a single resource of specific type
 *
 * @param object Generic object witch resource_data property
 * @param type Type of resource
 */
export function getResource<
  T extends { resources_data: Array<ResourceDataInterface> }
>(object: T, type: ResourceTypeName): ResourceDataInterface | null {
  const {
    uiStore: { languageId },
  } = stores;

  const resource = object.resources_data.find(
    resource => resource.type_name === type,
  );

  if (
    resource &&
    resource.hasOwnProperty('translation_data') &&
    resource.translation_data.length > 0 &&
    !Number.isNaN(languageId)
  ) {
    const translatedResource = resource.translation_data.find(
      resource => resource.language === languageId,
    );

    if (translatedResource) resource.file_url = translatedResource.file_url;
  }

  return resource ? resource : null;
}

export const isColorValid = (colorCode: string): boolean => {
  const regex = RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');

  return regex.test(colorCode);
};

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * Add id's to all menu items
 *
 * @param data.items Api response
 * @param data.id Start id
 */
export const patch = (data: {
  items: Array<MainMenuInterface>;
  id: number;
}): { items: Array<MainMenuPatchedInterface>; id: number } => {
  const patchedItems: Array<MainMenuPatchedInterface> = data.items.map(item => {
    const patchedItem = Object.assign({}, item) as MainMenuPatchedInterface;

    patchedItem.id = data.id;
    data.id = data.id + 1;

    if (patchedItem.child_menus_data.length > 0) {
      const patchedChildren = patch({
        items: item.child_menus_data,
        id: data.id,
      });

      patchedItem.child_menus_data = patchedChildren.items;
      data.id = patchedChildren.id;
    }

    return patchedItem;
  });

  return { items: patchedItems, id: data.id };
};
