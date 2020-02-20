import styled from 'styled-components';
import { Form as FormikForm } from 'formik';
import { rem } from 'polished';

const Form = styled(FormikForm)``;

export const InputContainer = styled.div`
  width: 100%;
  max-width: ${rem(360)};
  margin: 1em auto;
`;

export default Form;
