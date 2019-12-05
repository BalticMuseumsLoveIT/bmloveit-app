import Content from 'components/Content/Content';
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
import { Form, Formik, FormikValues } from 'formik';

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
      obj[`question-${item.id}`] = '';
      return obj;
    }, {});

  const initialValues = extractInitialValues(survey.questions_data);

  const handleSubmit = async (values: FormikValues) => {
    console.log('onSubmit', values);
  };

  const questions = survey.questions_data.map(question => {
    switch (question.type) {
      case SurveyQuestionType.SELECT:
        return <p key={question.id}>Radio</p>;
      case SurveyQuestionType.MULTISELECT:
        return <p key={question.id}>Checkbox</p>;
      case SurveyQuestionType.OPEN:
        return <p key={question.id}>Input</p>;
      default:
        return null;
    }
  });

  return (
    <>
      <h2>{survey.name}</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {questions}
            <button type="submit" disabled={isSubmitting}>
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
