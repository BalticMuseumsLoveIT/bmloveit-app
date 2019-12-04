import Content from 'components/Content/Content';
import store, { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

const Survey = function(props: { state: SurveyDetailsState }) {
  switch (props.state) {
    case SurveyDetailsState.LOADING:
      return <p>Wczytywanie...</p>;
    case SurveyDetailsState.LOADED:
      return <p>Details</p>;
    case SurveyDetailsState.NOT_FOUND:
      return <p>Ankieta o podanym identyfikatorze nie została odnaleziona</p>;
    case SurveyDetailsState.ERROR:
      return <p>Wystąpił błąd podczas pobierania ankiety</p>;
    default:
      return null;
  }
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
          <Survey state={store.state} />
        </Content>
      </>
    );
  }
}

export default SurveyDetailsPage;
