import QuizDetailsStore from 'utils/store/quizDetailsStore';
import { QuizAnswerResponse, QuizQuestionInterface } from 'utils/interfaces';
import React from 'react';
import {
  Formik,
  Form,
  FormikValues,
  ErrorMessage,
  Field,
  useField,
} from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import StyledFormikRadioButton from './QuizForm.style';

interface QuizSummaryProps {
  answer: QuizAnswerResponse | null;
}

const QuizSummary = function({ answer }: QuizSummaryProps) {
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

const QuestionImage = function({ url }: QuestionImageProps) {
  return url && url.length ? (
    <div>
      <img src={url} alt="Question illustration" />
    </div>
  ) : null;
};

interface QuizQuestion {
  name: string;
  question: QuizQuestionInterface;
  isDisabled?: boolean;
}

const QuizQuestion = function({ name, isDisabled, question }: QuizQuestion) {
  const [field] = useField(name);

  return (
    <fieldset disabled={isDisabled}>
      <legend>{question.description}</legend>
      <QuestionImage url={question.file_url} />
      {question.options_data.map(option => {
        const optionName = `option_${option.id}`;
        const isChecked = field.value === optionName;
        return (
          <StyledFormikRadioButton
            key={option.id}
            isChecked={isChecked}
            isCorrect={option.correct}
          >
            <Field
              type="radio"
              name={name}
              id={optionName}
              value={optionName}
              checked={isChecked}
            />
            <label htmlFor={name}>{option.description}</label>
          </StyledFormikRadioButton>
        );
      })}
      <ErrorMessage component="div" name={name} />
    </fieldset>
  );
};

interface SubmitButton {
  isDisabled?: boolean;
}

const SubmitButton = function({ isDisabled }: SubmitButton) {
  return (
    <button type="submit" disabled={isDisabled}>
      Submit
    </button>
  );
};

interface QuizFormProps {
  store: QuizDetailsStore;
}

@observer
class QuizForm extends React.Component<QuizFormProps> {
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
          {({ isSubmitting }) => {
            const isDisabled = isSubmitting || store.isSubmitted;
            return (
              <Form>
                <QuizQuestion
                  name={radioGroupName}
                  question={question}
                  isDisabled={isDisabled}
                />
                <SubmitButton isDisabled={isDisabled} />
              </Form>
            );
          }}
        </Formik>
        <QuizSummary answer={store.answer} />
      </>
    );
  }
}

export default QuizForm;
