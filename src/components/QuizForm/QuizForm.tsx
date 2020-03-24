import QuizDetailsStore from 'utils/store/quizDetailsStore';
import { QuizSummary } from 'components/QuizForm/QuizSummary';
import { QuizQuestion } from 'components/QuizForm/QuizQuestion';
import React from 'react';
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface QuizFormProps extends WithTranslation {
  store: QuizDetailsStore;
}

@observer
class QuizForm extends React.Component<QuizFormProps> {
  render() {
    if (!this.props.tReady) return null;

    const { store } = this.props;

    const question = store.question;

    if (question === null) return null;

    const radioGroupName = `question_${question.id}`;

    const initialValue =
      store.isAnswered &&
      store.fulfillment &&
      store.fulfillment.answers_data.length > 0 &&
      store.fulfillment.answers_data[0].options_selected_data.length > 0
        ? `option_${store.fulfillment.answers_data[0].options_selected_data[0].id}`
        : '';

    const formik = {
      initialValues: { [radioGroupName]: initialValue },
      validationSchema: Yup.object({
        [radioGroupName]: Yup.string().required(
          this.props.t(
            'validationSchema.question.required',
            'At least one option must be selected',
          ),
        ),
      }),
      onSubmit: async (values: FormikValues) => {
        await store.handleSubmit(
          question.id,
          parseInt(values[radioGroupName].split('_')[1]),
        );
      },
    };

    return (
      <>
        <Formik {...formik}>
          {({ isSubmitting }) => {
            const isDisabled =
              isSubmitting || store.isSubmitted || store.isAnswered;

            return (
              <Form id="quizForm">
                <QuizQuestion
                  name={radioGroupName}
                  question={question}
                  isDisabled={isDisabled}
                />
              </Form>
            );
          }}
        </Formik>
        <QuizSummary answer={store.answer} isAnswered={store.isAnswered} />
      </>
    );
  }
}

export default withTranslation('quiz-details-page')(QuizForm);
