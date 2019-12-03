import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Content from '../components/Content/Content';
import store, { SurveyListState } from '../utils/store/surveyListStore';

@observer
class SurveyListPage extends Component {
  async componentDidMount(): Promise<void> {
    await store.loadList();
  }

  render() {
    const list = function() {
      switch (store.state) {
        case SurveyListState.LOADING:
          return <p>Wczytywanie...</p>;
        case SurveyListState.LOADED:
          return store.list.map(survey => (
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
