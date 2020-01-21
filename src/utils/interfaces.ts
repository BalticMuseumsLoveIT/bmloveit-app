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
  items_data: Array<ItemInterface>;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
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
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
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

export interface QuizOptionInterface {
  id: number;
  no: number;
  description: string;
  file_url: string;
  description_translation?: Array<CommonApiTranslationInterface>;
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
  description_translation?: Array<CommonApiTranslationInterface>;
  options_data: Array<QuizOptionInterface>;
}

export interface QuizInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  location: number | null;
  item: number | null;
  language: number;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
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
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
}

export interface SurveyDetailsInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  language: number;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
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
  description_translation: Array<CommonApiTranslationInterface>;
  options_data: Array<SurveyOptionInterface>;
}

export interface SurveyOptionInterface {
  id: number;
  no: number;
  description: string;
  file_url: string;
  description_translation: Array<CommonApiTranslationInterface>;
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

export enum ItemType {
  DEFAULT = 'default',
  AVATAR_CHOICE = 'avatar_choice',
  AVATAR = 'avatar',
  SURVEY = 'survey',
  QUIZ = 'quiz',
  MAP = 'map',
  PANORAMA = 'panorama',
  CARD = 'card',
}

export enum ItemKind {
  SCREEN = 'screen',
  POPUP = 'popup',
  URL = 'url',
}

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
  name: ItemType;
  description: string;
}

export interface ItemKindInterface {
  id: number;
  name: ItemKind;
  description: string;
}

export interface ItemInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type: number | null;
  type_data: ItemTypeInterface | null;
  kind: number | null;
  kind_data: ItemKindInterface | null;
  locations: Array<number>;
  resources_data: Array<ResourceDataInterface>;
  quizzes_data: Array<QuizInterface>;
  child_items_data: Array<ItemInterface>;
  child_items?: Array<number>;
  next_item: number | null;
  qr_code: string;
  latitude: number | null;
  longitude: number | null;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
  actions_list: Array<{ id: number; name: string }>;
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
  about: string;
  terms_url: string;
  logo: string;
  image: string;
  name_translation: Array<CommonApiTranslationInterface>;
  title_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
  about_translation: Array<CommonApiTranslationInterface>;
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

// User Profile ----------------------------------------------------------------

export interface UserProfileInterface {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  status: string;
  language: number | null;
  country: number | null;
  user: number;
  guest: boolean;
  points: number;
  level_up_points: number | null;
  for_delete: boolean;
  owned_items_data: Array<any>;
  avatar: ItemInterface | null;
  badges_data: Array<any>;
  team: number | null;
}

// Auth ------------------------------------------------------------------------

export interface AuthTokenInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

// Teams -----------------------------------------------------------------------

interface TeamUserInterface {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  points: number;
  owned_items_data: [];
  avatar: ItemInterface | null;
  badges_data: [];
}

export interface TeamInterface {
  id: number;
  name: string;
  users: Array<TeamUserInterface>;
  avatar: ItemInterface | null;
  access_code: number;
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
