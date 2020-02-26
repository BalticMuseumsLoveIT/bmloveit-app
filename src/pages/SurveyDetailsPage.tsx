import Content from 'components/Content/Content';
import SurveyDetailsStore from 'utils/store/surveyDetailsStore';
import { SurveyDetails } from 'components/SurveyDetails/SurveyDetails';
import { SurveyFooter } from 'components/SurveyFooter/SurveyFooter';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { Description, Title } from 'components/Page/Page.style';
import { LinearIndicator } from 'components/LinearIndicator/LinearIndicator';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {}

@observer
class SurveyDetailsPage extends Component<Props> {
  surveyDetailsStore = new SurveyDetailsStore(true);

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    await this.surveyDetailsStore.loadData(parseInt(id));
  }

  async componentDidUpdate(prevProps: Props) {
    if (
      prevProps.tReady !== this.props.tReady ||
      typeof this.surveyDetailsStore.tReady === 'undefined'
    ) {
      this.surveyDetailsStore.setTReady(this.props.tReady);
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      await this.surveyDetailsStore.loadData(
        Number.parseInt(this.props.match.params.id),
      );
    }
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
          {(this.surveyDetailsStore.isSubmitting ||
            this.surveyDetailsStore.isLoading) && <LinearIndicator />}

          {this.surveyDetailsStore.title && (
            <Title>{this.surveyDetailsStore.title}</Title>
          )}

          {this.surveyDetailsStore.description &&
            !this.surveyDetailsStore.isSubmitted && (
              <Description>
                <ItemHtmlParser html={this.surveyDetailsStore.description} />
              </Description>
            )}

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
