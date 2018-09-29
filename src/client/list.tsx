import { ContentBox } from '@dabapps/roe';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getAllRepos } from '^/client/actions';
import { StoreState } from '^/client/store';
import { Repo } from '^/client/types';

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
              {data && data.map((repo: Repo) => {
                const details = [];

                if (repo.permissions.admin) {
                  details.push('admin');
                }

                if (repo.fork) {
                  details.push('fork');
                }

                return (
                  <ContentBox component="li" key={repo.id}>
                    <p className="bold">
                      <a href={repo.svn_url}>
                        {repo.full_name}
                      </a>
                      {
                        Boolean(details.length) && (
                          <span className="margin-left-base">
                            ({details.join(', ')})
                          </span>
                        )
                      }
                    </p>
                  </ContentBox>
                );
              })}
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
