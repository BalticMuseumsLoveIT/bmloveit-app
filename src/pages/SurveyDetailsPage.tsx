import Content from 'components/Content/Content';
import store, { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

@observer
class SurveyDetailsPage extends Component {
  componentDidMount() {
    console.log(store.state);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Survey list</title>
        </Helmet>
        <Content>
          <h1>List of active surveys</h1>
          <p>Content</p>
        </Content>
      </>
    );
  }
}

export default SurveyDetailsPage;
