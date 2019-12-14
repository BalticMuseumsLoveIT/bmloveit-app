import Content from 'components/Content/Content';
import SurveyDetailsStore from 'utils/store/surveyDetailsStore';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { SurveyDetails } from '../components/SurveyDetails/SurveyDetails';

interface SurveyDetailsProps extends RouteComponentProps<any> {}

@observer
class SurveyDetailsPage extends Component<SurveyDetailsProps> {
  surveyDetailsStore = new SurveyDetailsStore(true);

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    await this.surveyDetailsStore.loadSurvey(id);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Survey details</title>
        </Helmet>
        <Content>
          <h1>Survey details</h1>
          <SurveyDetails
            state={this.surveyDetailsStore.state}
            survey={this.surveyDetailsStore.survey}
            onSubmit={this.surveyDetailsStore.handleSubmit}
          />
        </Content>
      </>
    );
  }
}

export default SurveyDetailsPage;
