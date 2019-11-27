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
    return (
      <Formik
        initialValues={{ radioGroup: '' }}
        validationSchema={Yup.object({
          radioGroup: Yup.string().required(
            'At least one option should be selected',
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {props => (
          <Form>
            <RadioButtonGroup
              legend="Treść pytania"
              value={props.values.radioGroup}
              error={props.errors.radioGroup}
              touched={props.touched.radioGroup}
            >
              <RadioButton name="radioGroup" id="RG1" label="1500" />
              <RadioButton name="radioGroup" id="RG2" label="1600" />
              <RadioButton name="radioGroup" id="RG3" label="1700" />
              <RadioButton name="radioGroup" id="RG4" label="1800" />
            </RadioButtonGroup>
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default QuizFormik;
