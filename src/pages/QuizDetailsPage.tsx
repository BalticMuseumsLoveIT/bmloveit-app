import QuizDetailsStore from 'utils/store/quizDetailsStore';
import Content from 'components/Content/Content';
import { QuizDetails } from 'components/QuizDetails/QuizDetails';
import { QuizFooter } from 'components/QuizFooter/QuizFooter';
import { Description, Title } from 'components/Page/Page.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {}

@observer
class QuizPage extends React.Component<Props> {
  quizDetailsStore = new QuizDetailsStore(true);

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    this.quizDetailsStore.setTReady(this.props.tReady);

    await this.quizDetailsStore.loadData(id);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.quizDetailsStore.setTReady(this.props.tReady);
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      await this.quizDetailsStore.loadData(
        Number.parseInt(this.props.match.params.id),
      );
    }
  }

  componentWillUnmount(): void {
    this.quizDetailsStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Quiz')}</title>
        </Helmet>
        <Content>
          {this.quizDetailsStore.title && (
            <Title>{this.quizDetailsStore.title}</Title>
          )}

          {this.quizDetailsStore.description && (
            <Description>
              <ItemHtmlParser html={this.quizDetailsStore.description} />
            </Description>
          )}

          <QuizDetails
            state={this.quizDetailsStore.state}
            store={this.quizDetailsStore}
          />

          <QuizFooter
            state={this.quizDetailsStore.state}
            nextItemId={this.quizDetailsStore.nextItemId}
            isSubmitting={this.quizDetailsStore.isSubmitting}
          />
        </Content>
      </>
    );
  }
}

export default withTranslation('quiz-details-page')(QuizPage);
