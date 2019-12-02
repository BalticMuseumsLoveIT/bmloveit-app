import React from 'react';
import { Formik, Form, useField, FieldAttributes, FormikValues } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { QuizStore } from '../../utils/store/quizStore';
import Api from '../../utils/api';
import FormikRadioButton from '../FormikRadioButton/FormikRadioButton';

interface Props {
  quizStore: QuizStore;
}

const RadioButtonGroup = ({
  legend,
  children,
  touched,
  error,
  disabled,
}: FieldAttributes<any>) => {
  return (
    <fieldset disabled={disabled}>
      <legend>{legend}</legend>
      {children}
      {touched && error ? (
        <div style={{ color: 'red', padding: '.5em' }}>&#9888; {error}</div>
      ) : null}
    </fieldset>
  );
};

@observer
class QuizFormik extends React.Component<Props> {
  render() {
    const question = this.props.quizStore.questionData;

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
        // console.log(JSON.stringify(values, null, 2));

        try {
          const fulfillment = await Api.getQuizFulfillment(
            this.props.quizStore.quizDetails!.id,
          );

          // console.log(fulfillment);

          const answer = await Api.getQuizAnswer(
            fulfillment.id,
            question.id,
            parseInt(values[radioGroupName].split('_')[1]),
          );

          // console.log(answer);

          this.props.quizStore.submitQuizAnswer(answer);
        } catch (error) {
          this.props.quizStore.handleQuizDetailsError(error);
        }
      },
    };

    const summary = this.props.quizStore.isSubmitted ? (
      <div>
        <p>
          {this.props.quizStore.quizAnswer!.correct
            ? 'Congratulations! This is a correct answer'
            : 'Sorry but selected answer is incorrect'}
        </p>
        <p>
          <a href="/quiz">Go to the list of active quizzes</a>
        </p>
      </div>
    ) : null;

    return (
      <>
        <Formik {...formik}>
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <RadioButtonGroup
                legend={question.description}
                value={values[radioGroupName]}
                error={errors[radioGroupName]}
                touched={touched[radioGroupName]}
                disabled={this.props.quizStore.isSubmitted}
              >
                {question.options_data.map(option => (
                  <FormikRadioButton
                    key={option.id}
                    id={`option_${option.id}`}
                    name={radioGroupName}
                    label={option.description}
                    correct={option.correct}
                  />
                ))}
              </RadioButtonGroup>
              <br />
              <button
                type="submit"
                disabled={isSubmitting || this.props.quizStore.isSubmitted}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {summary}
      </>
    );
  }
}

export default QuizFormik;
