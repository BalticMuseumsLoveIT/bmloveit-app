import Content from 'components/Content/Content';
import SurveyListStore from 'utils/store/surveyListStore';
import { SurveyList } from 'components/SurveyList/SurveyList';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

@observer
class SurveyListPage extends Component {
  surveyListStore = new SurveyListStore(true);

  async componentDidMount() {
    await this.surveyListStore.loadList();
  }

  componentWillUnmount(): void {
    this.surveyListStore.unmount();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Survey list</title>
        </Helmet>
        <Content>
          <h1>List of active surveys</h1>
          <SurveyList
            list={this.surveyListStore.list}
            state={this.surveyListStore.state}
          />
        </Content>
      </>
    );
  }
}

export default SurveyListPage;
