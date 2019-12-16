import Content from 'components/Content/Content';
import SurveyListStore, { SurveyListState } from 'utils/store/surveyListStore';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer
class SurveyListPage extends Component {
  surveyListStore = new SurveyListStore();

  async componentDidMount() {
    await this.surveyListStore.loadList();
  }

  render() {
    const list = () => {
      switch (this.surveyListStore.state) {
        case SurveyListState.LOADING:
          return <p>Wczytywanie...</p>;
        case SurveyListState.LOADED:
          return this.surveyListStore.list.map(survey => (
            <p key={survey.id}>
              <Link to={`/survey/${survey.id}`}>{survey.name}</Link>
            </p>
          ));
        case SurveyListState.ERROR:
          return <p>Wystąpił błąd podczas pobierania listy ankiet</p>;
        default:
          return null;
      }
    };

    return (
      <>
        <Helmet>
          <title>Survey list</title>
        </Helmet>
        <Content>
          <h1>List of active surveys</h1>
          {list()}
        </Content>
      </>
    );
  }
}

export default SurveyListPage;
