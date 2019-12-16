import { SurveyQuestionInterface, SurveyQuestionType } from 'utils/interfaces';
import * as Yup from 'yup';

interface StringMap {
  [key: string]: string | Array<string>;
}

export const extractInitialValues = (array: Array<SurveyQuestionInterface>) => {
  return array.reduce((obj: StringMap, item: SurveyQuestionInterface) => {
    obj[`question_${item.id}`] =
      item.type === SurveyQuestionType.MULTISELECT ? [] : '';
    return obj;
  }, {});
};

export const extractValidationSchema = (
  array: Array<SurveyQuestionInterface>,
) => {
  return array.reduce(
    (obj: Yup.ObjectSchema, item: SurveyQuestionInterface) => {
      const schema = {
        [`question_${item.id}`]:
          item.type === SurveyQuestionType.MULTISELECT
            ? Yup.array()
                .of(Yup.string())
                .required('This field is required')
            : Yup.string().required('This field is required'),
      };

      return obj.shape(schema);
    },
    Yup.object(),
  );
};
