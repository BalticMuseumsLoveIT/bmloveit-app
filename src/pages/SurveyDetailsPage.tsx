import Content from 'components/Content/Content';
import FormikRadioButton from 'components/FormikRadioButton/FormikRadioButton';
import FormikRadioButtonGroup from 'components/FormikRadioButtonGroup/FormikRadioButtonGroup';
import store, { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import {
  SurveyDetailsInterface,
  SurveyQuestionInterface,
  SurveyQuestionType,
} from 'utils/interfaces';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Form, Field, ErrorMessage, Formik, FormikValues } from 'formik';

const Survey = function(props: {
  state: SurveyDetailsState;
  survey: SurveyDetailsInterface | null;
}) {
  const { state, survey } = props;
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

const SurveyForm = function(props: { survey: SurveyDetailsInterface }) {
  const { survey } = props;

  interface StringMap {
    [key: string]: string;
  }

  const extractInitialValues = (array: Array<SurveyQuestionInterface>) =>
    array.reduce((obj: StringMap, item: SurveyQuestionInterface) => {
      obj[`question_${item.id}`] = '';
      return obj;
    }, {});

  const initialValues = extractInitialValues(survey.questions_data);

  const handleSubmit = async (values: FormikValues) => {
    console.log('onSubmit', values);
  };

  // const Fieldset = ({ name, label, ...rest }: any) => {
  //   console.log(rest);
  //   return (
  //     <React.Fragment>
  //       <label htmlFor={name}>{label}</label>
  //       <Field id={name} name={name} {...rest} />
  //       <ErrorMessage name={name} />
  //     </React.Fragment>
  //   );
  // };

  return (
    <>
      <h2>{survey.name}</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formik => (
          <Form>
            {survey.questions_data.map(question => {
              switch (question.type) {
                case SurveyQuestionType.SELECT:
                  const n = `question_${question.id}`;
                  return (
                    <FormikRadioButtonGroup
                      key={question.id}
                      legend={question.description}
                      error={formik.errors[n]}
                      touched={formik.touched[n]}
                    >
                      {question.options_data.map(option => (
                        <FormikRadioButton
                          key={option.id}
                          id={`option_${option.id}`}
                          name={n}
                          label={option.description}
                        />
                      ))}
                    </FormikRadioButtonGroup>
                  );
                case SurveyQuestionType.MULTISELECT:
                  const questionName = `question_${question.id}`;
                  return (
                    <fieldset key={questionName}>
                      <legend>{question.description}</legend>
                      {question.options_data.map(option => {
                        const optionName = `option_${option.id}`;
                        return (
                          <div key={optionName}>
                            <Field
                              type="checkbox"
                              id={optionName}
                              name={questionName}
                              value={option.id}
                            />
                            <label htmlFor={optionName}>
                              {option.description}
                            </label>
                          </div>
                        );
                      })}
                    </fieldset>
                  );
                case SurveyQuestionType.OPEN:
                  return (
                    <p key={question.id}>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        {...formik.getFieldProps(`question_${question.id}`)}
                      />
                    </p>
                  );
                default:
                  return null;
              }
            })}
            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

interface Props extends RouteComponentProps<any> {}

@observer
class SurveyDetailsPage extends Component<Props> {
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
