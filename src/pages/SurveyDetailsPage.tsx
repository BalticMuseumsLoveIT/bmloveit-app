import Content from 'components/Content/Content';
import store, { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import {
  SurveyDetailsInterface,
  SurveyOptionInterface,
  SurveyQuestionInterface,
  SurveyQuestionType,
} from 'utils/interfaces';
import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikValues,
} from 'formik';

interface SurveyProps {
  state: SurveyDetailsState;
  survey: SurveyDetailsInterface | null;
  onSubmit: (values: FormikValues) => Promise<void>;
}

const Survey = function({ state, survey, onSubmit }: SurveyProps) {
  switch (state) {
    case SurveyDetailsState.LOADING:
      return <p>Wczytywanie...</p>;
    case SurveyDetailsState.LOADED:
      return (
        (survey && <SurveyForm survey={survey} onSubmit={onSubmit} />) || null
      );
    case SurveyDetailsState.SUBMITTED:
      return (
        <div>
          <p>You have finished a survey - thank you</p>
          <p>
            <Link to="/survey">Go to the list of active surveys</Link>
          </p>
        </div>
      );
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
  onSubmit: (values: FormikValues) => Promise<void>;
}

const SurveyForm = function({ survey, onSubmit }: SurveyFormProps) {
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
      <>
        {options.map(option => {
          const optionName = `option_${option.id}`;
          return (
            <div key={optionName}>
              <Field
                type="checkbox"
                name={field.name}
                id={optionName}
                value={optionName}
                multiple
              />
              <label htmlFor={optionName}>{option.description}</label>
            </div>
          );
        })}
      </>
    );
  };

  interface RadioGroupProps extends FieldProps {
    options: Array<SurveyOptionInterface>;
  }

  const RadioGroup = ({ field, options }: RadioGroupProps) => {
    return (
      <>
        {options.map(option => {
          const optionName = `option_${option.id}`;
          const isChecked = field.value === optionName;
          return (
            <div key={option.id}>
              <Field
                type="radio"
                name={field.name}
                id={optionName}
                value={optionName}
                checked={isChecked}
              />
              <label htmlFor={field.name}>{option.description}</label>
            </div>
          );
        })}
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
        onSubmit={onSubmit}
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
          <Survey
            state={store.state}
            survey={store.survey}
            onSubmit={store.handleSubmit}
          />
        </Content>
      </>
    );
  }
}

export default SurveyDetailsPage;
