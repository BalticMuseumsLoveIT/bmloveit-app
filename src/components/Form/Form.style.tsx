import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

const Form = styled(FormikForm)`
  padding: 10px 0;
`;

export const InputContainer = styled.div`
  width: 93%;
  max-width: 360px;
  margin: 10px auto;
`;

export default Form;
