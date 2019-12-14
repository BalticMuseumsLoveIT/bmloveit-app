import { SurveyInterface } from 'utils/interfaces';
import { SurveyListState } from 'utils/store/surveyListStore';
import { Link } from 'react-router-dom';
import React from 'react';

export interface SurveyListProps {
  list: Array<SurveyInterface>;
  state: SurveyListState;
}

export const SurveyList = ({ list, state }: SurveyListProps) => {
  switch (state) {
    case SurveyListState.LOADED:
      return (
        <>
          {list.map(survey => (
            <p key={survey.id}>
              <Link to={`/survey/${survey.id}`}>{survey.name}</Link>
            </p>
          ))}
        </>
      );
    case SurveyListState.ERROR:
      return <h1>List could not be loaded</h1>;
    case SurveyListState.NOT_LOADED:
    case SurveyListState.LOADING:
    default:
      return null;
  }
};
