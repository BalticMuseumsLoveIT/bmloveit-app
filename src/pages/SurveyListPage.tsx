import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Content from '../components/Content/Content';

class SurveyListPage extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Survey list</title>
        </Helmet>
        <Content>
          <h1>List of active surveys</h1>
        </Content>
      </>
    );
  }
}

export default SurveyListPage;
