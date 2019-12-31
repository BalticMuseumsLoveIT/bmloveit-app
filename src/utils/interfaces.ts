export interface SignInResponseInterface {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
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
  name_translation: Array<CommonLanguageInterface>;
  name_full_translation: Array<CommonLanguageInterface>;
  description_translation: Array<CommonLanguageInterface>;
  x: number | null;
  y: number | null;
  screens: Array<number>;
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

export interface TranslationItemInterface {
  language: number;
  text: string;
}

export interface QuizOptionInterface {
  id: number;
  no: number;
  description: string;
  file_url: string;
  description_translation?: Array<TranslationItemInterface>;
  correct?: boolean;
}

enum QuizQuestionType {
  Open = 'O',
  Select = 'S',
  Multiselect = 'M',
}

export interface QuizQuestionInterface {
  id: number;
  no: number;
  type: QuizQuestionType;
  description: string;
  value_type: string;
  file_url: string;
  description_translation?: Array<TranslationItemInterface>;
  options_data: Array<QuizOptionInterface>;
}

export interface QuizInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  language: number;
  name_translation: Array<TranslationItemInterface>;
  name_full_translation: Array<TranslationItemInterface>;
  description_translation: Array<TranslationItemInterface>;
}

export interface QuizDetailsInterface extends QuizInterface {
  questions_data: Array<QuizQuestionInterface>;
}

export interface QuizDetailsNotFound {
  detail: string;
}

export function isQuizDetailsNotFound(
  quizDetailsNotFound: QuizDetailsNotFound,
): quizDetailsNotFound is QuizDetailsNotFound {
  return (quizDetailsNotFound as QuizDetailsNotFound).detail !== undefined;
}

export interface QuizFulfillmentResponse {
  id: number;
  quiz: number;
  user: number;
  date_add: string;
}

export interface QuizAnswerResponse {
  id: number;
  fulfillment: number;
  question: number;
  value: string;
  correct: boolean;
  options_selected_data: Array<QuizOptionInterface>;
  question_data: QuizQuestionInterface;
}

// Survey ----------------------------------------------------------------------

export interface SurveyInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  location: number | null;
  item: number | null;
  language: number;
  name_translation: Array<TranslationItemInterface>;
  name_full_translation: Array<TranslationItemInterface>;
  description_translation: Array<TranslationItemInterface>;
}

export interface SurveyDetailsInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  language: number;
  name_translation: Array<TranslationItemInterface>;
  name_full_translation: Array<TranslationItemInterface>;
  description_translation: Array<TranslationItemInterface>;
  questions_data: Array<SurveyQuestionInterface>;
}

export enum SurveyQuestionType {
  OPEN = 'O',
  SELECT = 'S',
  MULTISELECT = 'M',
}

export interface SurveyQuestionInterface {
  id: number;
  no: number;
  type: SurveyQuestionType;
  description: string;
  file_url: string;
  description_translation: Array<TranslationItemInterface>;
  options_data: Array<SurveyOptionInterface>;
}

export interface SurveyOptionInterface {
  id: number;
  no: number;
  description: string;
  file_url: string;
  description_translation: Array<TranslationItemInterface>;
}

export interface SurveyFulfillmentResponse {
  id: number;
  survey: number;
  user: number;
  date_add: string;
}

export interface SurveyAnswerResponse {
  id: number;
  fulfillment: number;
  question: number;
  value: string;
}

// Item ------------------------------------------------------------------------

export enum ResourceTypeName {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
}

export interface ResourceDataInterface {
  name: string;
  type: string;
  type_name: ResourceTypeName;
  file_url: string;
}

export interface ItemTypeInterface {
  id: number;
  name: string;
  description: string;
}

export interface ItemKindInterface {
  id: number;
  name: string;
  description: string;
}

export interface ItemInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type: number;
  type_data: ItemTypeInterface;
  kind: number;
  kind_data: ItemKindInterface;
  locations: Array<number>;
  resources_data: Array<ResourceDataInterface>;
  quizzes_data: Array<QuizInterface>;
  child_items_data: Array<ItemInterface>;
  next_items_data: Array<ItemInterface>;
  qr_code: string;
  latitude: number | null;
  longitude: number | null;
  name_translation: Array<CommonLanguageInterface>;
  name_full_translation: Array<CommonLanguageInterface>;
  description_translation: Array<CommonLanguageInterface>;
  actions_list: [];
  routes: Array<number>;
  x: number | null;
  y: number | null;
}

// Site ------------------------------------------------------------------------

export interface SiteInterface {
  id: number;
  name: string;
  title: string;
  description: string;
  terms_url: string;
  logo: string;
  image: string;
  name_translation: Array<CommonApiTranslationInterface>;
  title_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
}

// Area ------------------------------------------------------------------------

export interface AreaInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type_data: TypeDataInterface;
  country: number;
  adress: string;
  logo: string | null;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
}

// Generic ---------------------------------------------------------------------

export interface APIErrorInterface {
  detail: string;
}

export function isAPIError(APIResponse: any): APIResponse is APIErrorInterface {
  return (APIResponse as APIErrorInterface).detail !== undefined;
}

// Common ----------------------------------------------------------------------

export interface CommonLanguageInterface {
  id: number;
  key: string;
  value: string;
}

export interface CommonApiTranslationInterface {
  language: number;
  text: string;
}
