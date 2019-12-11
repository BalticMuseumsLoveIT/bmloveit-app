export interface SignInResponseInterface {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface AreaInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type_data: TypeDataInterface;
  country: number | null;
  address: string;
  active: boolean;
  name_translation: Array<any>;
  name_full_translation: Array<any>;
  description_translation: Array<any>;
}

export interface RouteInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type: number;
  type_data: TypeDataInterface;
  areas: Array<number>;
  areas_data: Array<AreaInterface>;
  locations_data: Array<LocationInterface>;
  items_data: Array<any>;
  name_translation: Array<any>;
  name_full_translation: Array<any>;
  description_translation: Array<any>;
  languages: Array<number>;
}

export interface LocationInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type_data: TypeDataInterface;
  areas: Array<number>;
  routes: Array<any>;
  resources_data: Array<any>;
  quizzes_data: Array<any>;
  qr_code: string;
  latitude: number | null;
  longitude: number | null;
  name_translation: Array<any>;
  name_full_translation: Array<any>;
  description_translation: Array<any>;
}

export interface TypeDataInterface {
  id: number;
  name: string;
  description: string;
}

export interface LoginButtonPropsInterface {
  onSuccess: (argument: OAuthLoginArgumentInterface) => Promise<void>;
}

export interface OAuthLoginArgumentInterface {
  provider: string;
  response: any;
}
