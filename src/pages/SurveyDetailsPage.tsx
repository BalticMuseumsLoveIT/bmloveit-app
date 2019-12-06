import Content from 'components/Content/Content';
import FormikRadioButton from 'components/FormikRadioButton/FormikRadioButton';
import store, { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import {
  SurveyDetailsInterface,
  SurveyOptionInterface,
  SurveyQuestionInterface,
  SurveyQuestionType,
} from 'utils/interfaces';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import {
  ArrayHelpers,
  ErrorMessage,
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikValues,
} from 'formik';

interface SurveyProps {
  state: SurveyDetailsState;
  survey: SurveyDetailsInterface | null;
}

const Survey = function({ state, survey }: SurveyProps) {
  switch (state) {
    case SurveyDetailsState.LOADING:
      return <p>Wczytywanie...</p>;
    case SurveyDetailsState.LOADED:
      return (survey && <SurveyForm survey={survey} />) || null;
    case SurveyDetailsState.NOT_FOUND:
      return <p>Ankieta o podanym identyfikatorze nie została odnaleziona</p>;
    case SurveyDetailsState.ERROR:
      return <p>Wystąpił błąd podczas pobierania ankiety</p>;
    default:
      return null;
  }
};

interface SurveyFormProps {
  survey: SurveyDetailsInterface;
}

const SurveyForm = function({ survey }: SurveyFormProps) {
  interface StringMap {
    [key: string]: string | Array<string>;
  }

  const extractInitialValues = (array: Array<SurveyQuestionInterface>) => {
    return array.reduce((obj: StringMap, item: SurveyQuestionInterface) => {
      obj[`question_${item.id}`] =
        item.type === SurveyQuestionType.MULTISELECT ? [] : '';
      return obj;
    }, {});
  };

  const initialValues = extractInitialValues(survey.questions_data);

  const extractValidationSchema = (array: Array<SurveyQuestionInterface>) => {
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

  const validationSchema = extractValidationSchema(survey.questions_data);

  const handleSubmit = async (values: FormikValues) => {
    console.log('onSubmit', values);
  };

  const QuestionImage = ({ url }: { url?: string }) => {
    return (
      (url && url.length && (
        <div>
          <img src={url} alt="Question illustration" />
        </div>
      )) ||
      null
    );
  };

  interface CheckboxGroupProps extends FieldProps {
    options: Array<SurveyOptionInterface>;
  }

  const CheckboxGroup = ({ field, options }: CheckboxGroupProps) => {
    return (
      <FieldArray name={field.name}>
        {(arrayHelpers: ArrayHelpers): React.ReactNode => (
          <>
            {options.map(option => {
              const optionName = `option_${option.id}`;
              return (
                <div key={optionName}>
                  <input
                    type="checkbox"
                    name={field.name}
                    id={optionName}
                    value={optionName}
                    checked={field.value.includes(optionName)}
                    onChange={e => {
                      if (e.target.checked) arrayHelpers.push(optionName);
                      else {
                        const idx = field.value.indexOf(optionName);
                        arrayHelpers.remove(idx);
                      }
                    }}
                  />
                  <label htmlFor={optionName}>{option.description}</label>
                </div>
              );
            })}
          </>
        )}
      </FieldArray>
    );
  };

  interface RadioGroupProps extends FieldProps {
    options: Array<SurveyOptionInterface>;
  }

  const RadioGroup = ({ field, options }: RadioGroupProps) => {
    return (
      <>
        {options.map(option => (
          <FormikRadioButton
            key={option.id}
            id={`option_${option.id}`}
            name={field.name}
            label={option.description}
          />
        ))}
      </>
    );
  };

  interface SurveyQuestionProps extends FieldProps {
    question: SurveyQuestionInterface;
  }

  const SurveyQuestion = ({ field, question }: SurveyQuestionProps) => {
    return (
      <fieldset>
        <legend>{question.description}</legend>
        <QuestionImage url={question.file_url} />
        {(() => {
          switch (question.type) {
            case SurveyQuestionType.SELECT:
              return (
                <Field
                  name={field.name}
                  component={RadioGroup}
                  options={question.options_data}
                />
              );
            case SurveyQuestionType.MULTISELECT:
              return (
                <Field
                  name={field.name}
                  component={CheckboxGroup}
                  options={question.options_data}
                />
              );
            case SurveyQuestionType.OPEN:
              return <Field name={field.name} component="textarea" />;
            default:
              return null;
          }
        })()}
        <ErrorMessage component="div" name={field.name} />
      </fieldset>
    );
  };

  return (
    <>
      <h2>{survey.name}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            {survey.questions_data.map(question => (
              <Field
                key={question.id}
                name={`question_${question.id}`}
                question={question}
                component={SurveyQuestion}
              />
            ))}
            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

interface SurveyDetailsProps extends RouteComponentProps<any> {}

@observer
class SurveyDetailsPage extends Component<SurveyDetailsProps> {
  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    await store.loadSurvey(id);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Survey details</title>
        </Helmet>
        <Content>
          <h1>Survey details</h1>
          <Survey state={store.state} survey={store.survey} />
        </Content>
      </>
    );
  }
}

export default SurveyDetailsPage;
