import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getAllRepos } from '^/client/actions';
import { StoreState } from '^/client/store';

type StateProps = Pick<StoreState, 'repos'>;

interface DispatchProps {
  getAllRepos: typeof getAllRepos;
}

type Props = StateProps & DispatchProps;

class List extends PureComponent<Props> {
  public componentDidMount () {
    this.props.getAllRepos();
  }

  public render () {
    const { loading, error, data } = this.props.repos;

    if (loading) {
      return (
        <p>
          Loading...
        </p>
      );
    }

    if (error) {
      return (
        <p className="error">
          {error.message}
        </p>
      );
    }

    if (data && data && data.length) {
      return (
        <ul>
          {data.map((repo: any) => (
            <li>
              {repo.full_name}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p>
        No repos
      </p>
    );
  }
}

export const mapStateToProps = ({repos}: StoreState): StateProps => {
  return {
    repos,
  };
};

export default connect(mapStateToProps, { getAllRepos })(List);
