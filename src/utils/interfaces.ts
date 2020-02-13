export interface RouteInterface {
  id: number;
  name: string;
  name_full: string;
  description: string;
  type: number;
  type_data: RouteTypeInterface;
  areas: Array<number>;
  areas_data: Array<AreaInterface>;
  locations: Array<number>;
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
  type_data: RouteTypeInterface | null;
  areas: Array<number>;
  routes: Array<number>;
  resources_data: Array<ResourceDataInterface>;
  quizzes_data: Array<QuizInterface>;
  qr_code: string;
  latitude: number | null;
  longitude: number | null;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
  x: number | null;
  y: number | null;
  screen_default: number | null;
  screens: Array<number>;
}

export interface RouteTypeInterface {
  id: number;
  name: string;
  description: string;
  description_translation: Array<CommonApiTranslationInterface>;
}

export interface LoginButtonPropsInterface {
  onSuccess: (argument: OAuthLoginArgumentInterface) => Promise<void>;
  onFailed: () => Promise<void>;
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
  LINK = 'link',
}

export enum ItemKind {
  SCREEN = 'screen',
  POPUP = 'popup',
  MENU = 'menu',
}

export enum ItemTag {
  MAIN = 'main',
}

export enum ResourceTypeName {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Icon = 'icon',
}

export interface ResourceDataInterface {
  name: string;
  type: string;
  type_name: ResourceTypeName;
  file_url: string;
  translation_data: Array<CommonResourceTranslationInterface>;
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
  quizz: number | null;
  survey: number | null;
  child_items_data: Array<ItemInterface>;
  child_items?: Array<number>;
  next_item: number | null;
  qr_code: string;
  latitude: number | null;
  longitude: number | null;
  name_translation: Array<CommonApiTranslationInterface>;
  name_full_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
  actions_list: Array<CommonActionInterface>;
  routes: Array<number>;
  x: number | null;
  y: number | null;
}

export interface ItemMapElementInterface {
  x: number;
  y: number;
  link: string;
  icon: string;
}

// Site ------------------------------------------------------------------------

export enum ThemeType {
  DARK = 'D',
  LIGHT = 'L',
}

export interface FontInterface {
  fontFamily: string;
  fontWeight: string;
}

export interface AnchorInterface {
  link: string;
  hover: string;
  active: string;
  visited: string;
}

export interface ThemeFontsInterface {
  header: FontInterface;
  subheader: FontInterface;
  alternative: FontInterface;
  paragraph: FontInterface;
}

interface ThemeButtonColorsInterface {
  text: string;
  background: string;
}

interface ThemeButtonColorEffectOnMouseEventInterface {
  default: ThemeButtonColorsInterface;
  hover: ThemeButtonColorsInterface;
  focus: ThemeButtonColorsInterface;
  disabled: ThemeButtonColorsInterface;
}

interface ThemeListColorEffectOnMouseEventInterface {
  default: ThemeButtonColorsInterface;
  hover: ThemeButtonColorsInterface;
  focus: ThemeButtonColorsInterface;
}

export interface ThemeColorsInterface {
  text: {
    header: string;
    paragraph: string;
    alternative: string;
    anchor: AnchorInterface;
  };
  background: {
    app: string;
    default: string;
    alternative: string;
    menu: string;
    placeholder: string;
  };
  button: {
    primary: ThemeButtonColorEffectOnMouseEventInterface;
    secondary: ThemeButtonColorEffectOnMouseEventInterface;
    outline: ThemeButtonColorEffectOnMouseEventInterface;
  };
  list: {
    border: string;
    header: ThemeListColorEffectOnMouseEventInterface;
    item: ThemeListColorEffectOnMouseEventInterface;
    info: string;
  };
  icon: {
    normal: string;
    hover: string;
    pressed: string;
    inactive: string;
  };
}

export interface SiteInterface {
  id: number;
  name: string;
  title: string;
  description: string;
  about: string;
  terms_url: string;
  logo: string | null;
  image: string | null;
  theme: ThemeType | null;
  background_color: string | null;
  primary_color: string | null;
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
  type_data: RouteTypeInterface;
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
  level_current_points: number | null;
  for_delete: boolean;
  owned_items_data: Array<OwnedItemInterface>;
  avatar: ItemInterface | null;
  badges_data: Array<BadgeInterface>;
  team: number | null;
}

export interface OwnedItemInterface {
  item_data: ItemInterface;
  item_counter: number;
}

export interface BadgeInterface {
  id: number;
  name: string;
  description: string;
  resources_data: Array<ResourceDataInterface>;
  name_translation: Array<CommonApiTranslationInterface>;
  description_translation: Array<CommonApiTranslationInterface>;
}

export interface UserProfileCreateInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  language: number | null;
  country: number | null;
  for_delete: boolean;
  guest: boolean;
}

// Auth ------------------------------------------------------------------------

export interface AuthTokenInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  expires_date: string;
  created_date: string;
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

export interface CommonResourceTranslationInterface {
  language: number;
  file_url: string;
}

export interface CommonActionInterface {
  id: number;
  name: string;
  description: string;
}

export interface ButtonProps {
  isDisabled?: boolean;
  isThin?: boolean;
}
