import { SurveyQuestionInterface, SurveyQuestionType } from 'utils/interfaces';
import * as Yup from 'yup';
import { TFunction } from 'i18next';

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
  t: TFunction,
) => {
  return array.reduce(
    (obj: Yup.ObjectSchema, item: SurveyQuestionInterface) => {
      const schema = {
        // i18next-extract-mark-ns-start survey-details-page
        [`question_${item.id}`]:
          item.type === SurveyQuestionType.MULTISELECT
            ? Yup.array()
                .of(Yup.string())
                .required(
                  t(
                    'validationSchema.multiselect.required',
                    'This field is required',
                  ),
                )
            : Yup.string().required(
                t('validationSchema.single.required', 'This field is required'),
              ),
        // i18next-extract-mark-ns-stop survey-details-page
      };

      return obj.shape(schema);
    },
    Yup.object(),
  );
};
