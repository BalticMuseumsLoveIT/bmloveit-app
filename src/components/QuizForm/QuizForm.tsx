import * as React from 'react';
import { observer } from 'mobx-react';
import Api from 'utils/api';
import { QuizStore } from '../../utils/store/quizStore';

interface Props {
  quizStore: QuizStore;
}

@observer
class QuizForm extends React.Component<Props> {
  onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fulfillment = await Api.getQuizFulfillment(
      this.props.quizStore.quizDetails!.id,
    );

    const answer = await Api.getQuizAnswer(fulfillment.id, 3, 5);

    console.log(answer);
  };

  render() {
    if (this.props.quizStore.quizDetails === null) return null;

    const { questions_data } = this.props.quizStore.quizDetails;

    const questions = questions_data.map(question => (
      <div key={question.id}>
        <p>{question.description}</p>
        {question.options_data.map(option => (
          <div key={option.id}>
            <input
              type="radio"
              id={`option-${option.no}`}
              name={`question-${question.id}`}
              value={option.no}
            />
            <label htmlFor={`option-${option.no}`}>{option.description}</label>
          </div>
        ))}
      </div>
    ));

    return (
      <form onSubmit={this.onFormSubmit}>
        {questions}
        <input type="submit" />
      </form>
    );
  }
}

export default QuizForm;
