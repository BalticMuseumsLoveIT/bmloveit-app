import React from 'react';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import * as Yup from 'yup';
import { QuizStore } from '../../utils/store/quizStore';

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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 2000);
        }}
      >
        {props => (
          <Form>
            <RadioButtonGroup
              legend={question.description}
              value={props.values[radioGroupName]}
              error={props.errors[radioGroupName]}
              touched={props.touched[radioGroupName]}
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
            <button type="submit" disabled={props.isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default QuizFormik;
