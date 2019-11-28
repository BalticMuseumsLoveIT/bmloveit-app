import React from 'react';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import * as Yup from 'yup';
import { QuizStore } from '../../utils/store/quizStore';
import Api from '../../utils/api';

interface Props {
  quizStore: QuizStore;
}

const RadioButton = ({ label, id, ...props }: FieldAttributes<any>) => {
  const [field] = useField(props);
  return (
    <div>
      <input
        type="radio"
        {...field}
        {...props}
        value={id}
        checked={id === field.value}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
    </div>
  );
};

const RadioButtonGroup = ({
  legend,
  children,
  touched,
  error,
}: FieldAttributes<any>) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {children}
      {touched && error ? (
        <div style={{ color: 'red', padding: '.5em' }}>&#9888; {error}</div>
      ) : null}
    </fieldset>
  );
};

class QuizFormik extends React.Component<Props> {
  render() {
    if (this.props.quizStore.quizDetails === null) return null;

    // As for now assume that we have 1 valid question
    const question = this.props.quizStore.quizDetails.questions_data[0];

    // Radio group html name
    const radioGroupName = `question_${question.id}`;

    return (
      <Formik
        initialValues={{ [radioGroupName]: '' }}
        validationSchema={Yup.object({
          [radioGroupName]: Yup.string().required(
            'At least one option must be selected',
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log(JSON.stringify(values, null, 2));

          const fulfillment = await Api.getQuizFulfillment(
            this.props.quizStore.quizDetails!.id,
          );

          // console.log(fulfillment);

          const answer = await Api.getQuizAnswer(
            fulfillment.id,
            question.id,
            parseInt(values[radioGroupName].split('_')[1]),
          );

          console.log(answer);

          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <RadioButtonGroup
              legend={question.description}
              value={values[radioGroupName]}
              error={errors[radioGroupName]}
              touched={touched[radioGroupName]}
            >
              {question.options_data.map(option => (
                <RadioButton
                  key={option.id}
                  id={`option_${option.id}`}
                  name={radioGroupName}
                  label={option.description}
                />
              ))}
            </RadioButtonGroup>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default QuizFormik;
