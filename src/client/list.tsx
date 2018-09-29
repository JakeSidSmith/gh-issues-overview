import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getAllRepos } from '^/client/actions';
import RepoItem from '^/client/repo-item';
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

    if (error) {
      return (
        <p className="error">
          {error.message}
        </p>
      );
    }

    return (
      <>
        {
          !loading && !data ? (
            <p>
              No repos
            </p>
          ) : (
            <ul className="list-style-none">
              {data && data.map((repo) => <RepoItem key={repo.id} repo={repo} />)}
            </ul>
          )
        }
        {
          loading && (
            <p>
              Loading...
            </p>
          )
        }
      </>
    );
  }
}

export const mapStateToProps = ({repos}: StoreState): StateProps => {
  return {
    repos,
  };
};

export default connect(mapStateToProps, { getAllRepos })(List);
