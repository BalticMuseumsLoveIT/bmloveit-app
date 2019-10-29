import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  route: {
    id: number;
    name: string;
  };
}

class RouteTile extends React.Component<Props> {
  public render(): React.ReactNode {
    const { id, name } = this.props.route;
    return (
      <div>
        <Link to={`/routes/${id}`}>{name}</Link>
      </div>
    );
  }
}

export default RouteTile;
