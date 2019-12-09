import { QuizDetailsStore } from 'utils/store/quizDetailsStore';
import FormikRadioButton from 'components/FormikRadioButton/FormikRadioButton';
import FormikRadioButtonGroup from 'components/FormikRadioButtonGroup/FormikRadioButtonGroup';
import { QuizAnswerResponse } from 'utils/interfaces';
import React from 'react';
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface SummaryProps {
  answer: QuizAnswerResponse | null;
}

const Summary = function({ answer }: SummaryProps) {
  return (
    answer && (
      <div>
        <p>
          {answer.correct
            ? 'Congratulations! This is a correct answer'
            : 'Sorry but selected answer is incorrect'}
        </p>
        <p>
          <Link to="/quiz">Go to the list of active quizzes</Link>
        </p>
      </div>
    )
  );
};

interface QuestionImageProps {
  url?: string;
}

export const QuestionImage: React.FC<QuestionImageProps> = ({ url }) => {
  return (
    (url && url.length && (
      <div>
        <img src={url} alt="Question illustration" />
      </div>
    )) ||
    null
  );
};

interface QuizFormikProps {
  store: QuizDetailsStore;
}

@observer
class QuizFormik extends React.Component<QuizFormikProps> {
  render() {
    const { store } = this.props;

    const question = store.question;

    if (question === null) return null;

    // Radio group html name
    const radioGroupName = `question_${question.id}`;

    const formik = {
      initialValues: { [radioGroupName]: '' },
      validationSchema: Yup.object({
        [radioGroupName]: Yup.string().required(
          'At least one option must be selected',
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
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <QuestionImage url={question.file_url} />
              <FormikRadioButtonGroup
                legend={question.description}
                disabled={store.isSubmitted}
                error={errors[radioGroupName]}
                touched={touched[radioGroupName]}
              >
                {question.options_data.map(option => (
                  <FormikRadioButton
                    key={option.id}
                    id={`option_${option.id}`}
                    name={radioGroupName}
                    label={option.description}
                    isCorrect={option.correct}
                  />
                ))}
              </FormikRadioButtonGroup>
              <br />
              <button
                type="submit"
                disabled={isSubmitting || store.isSubmitted}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Summary answer={store.answer} />
      </>
    );
  }
}

export default QuizFormik;
