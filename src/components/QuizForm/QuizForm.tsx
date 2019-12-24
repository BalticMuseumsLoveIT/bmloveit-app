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

    // Radio group html name
    const radioGroupName = `question_${question.id}`;

    const formik = {
      initialValues: { [radioGroupName]: '' },
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
            const isDisabled = isSubmitting || store.isSubmitted;
            return (
              <Form>
                <QuizQuestion
                  name={radioGroupName}
                  question={question}
                  isDisabled={isDisabled}
                />
                <button type="submit" disabled={isDisabled}>
                  {this.props.t('form.button.submit.label', 'Submit')}
                </button>
              </Form>
            );
          }}
        </Formik>
        <QuizSummary answer={store.answer} />
      </>
    );
  }
}

export default withTranslation('quiz-details-page')(QuizForm);
