export interface TranslationItemInterface {
  language: number;
  text: string;
}

export interface RouteInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type: number;
  active: boolean;
  areas: Array<number>;
  locations: Array<number>;
  name_translation: Array<string>;
  name_full_translation: Array<string>;
  description_translation: Array<string>;
}

export interface LocationInterface {
  areas: Array<number>;
  active: boolean;
  description: string;
  description_translation: Array<any>;
  id: number;
  latitude: number | null;
  longitude: number | null;
  name: string;
  name_full: string;
  name_full_translation: Array<any>;
  qr_code: string;
  resources_data: Array<any>;
  routes: Array<number>;
}

export interface QuizOptionInterface {
  id: number;
  no: number;
  description: string;
  file_url: string;
  description_translation: TranslationItemInterface[];
}

export interface QuizInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  language: number;
  name_translation: TranslationItemInterface[];
  name_full_translation: TranslationItemInterface[];
  description_translation: TranslationItemInterface[];
}
