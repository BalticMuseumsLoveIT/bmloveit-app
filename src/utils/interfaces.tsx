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

// Generic ---------------------------------------------------------------------

export interface APIErrorInterface {
  detail: string;
}

export function isAPIError(APIResponse: any): APIResponse is APIErrorInterface {
  return (APIResponse as APIErrorInterface).detail !== undefined;
}
