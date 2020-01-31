import Content from 'components/Content/Content';
import SurveyDetailsStore from 'utils/store/surveyDetailsStore';
import { SurveyDetails } from 'components/SurveyDetails/SurveyDetails';
import { SurveyFooter } from 'components/SurveyFooter/SurveyFooter';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SurveyDetailsProps
  extends WithTranslation,
    RouteComponentProps<any> {}

@observer
class SurveyDetailsPage extends Component<SurveyDetailsProps> {
  surveyDetailsStore = new SurveyDetailsStore(true);

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    await this.surveyDetailsStore.loadSurvey(parseInt(id));
  }

  componentWillUnmount(): void {
    this.surveyDetailsStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Survey details')}</title>
        </Helmet>
        <Content>
          <h1>{this.surveyDetailsStore.title}</h1>
          <SurveyDetails
            state={this.surveyDetailsStore.state}
            survey={this.surveyDetailsStore.survey}
            onSubmit={this.surveyDetailsStore.handleSubmit}
          />
          <SurveyFooter
            state={this.surveyDetailsStore.state}
            nextItemId={this.surveyDetailsStore.nextItemId}
            isSubmitting={this.surveyDetailsStore.isSubmitting}
          />
        </Content>
      </>
    );
  }
}

export default withTranslation('survey-details-page')(SurveyDetailsPage);
