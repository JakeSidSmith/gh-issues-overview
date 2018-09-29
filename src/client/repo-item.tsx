import { ContentBox, SpacedGroup } from '@dabapps/roe';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import urlTemplate from 'url-template';

import { getIssues } from '^/client/actions';
import { StoreState } from '^/client/store';
import { Repo } from '^/client/types';
import { getProxyUrl } from '^/client/utils';

interface OwnProps {
  repo: Repo;
}

type StateProps = Pick<StoreState, 'issues'>;

interface DispatchProps {
  getIssues: typeof getIssues;
}

type Props = OwnProps & StateProps & DispatchProps;

class RepoItem extends PureComponent<Props> {
  private url: string;
  public constructor (props: Props) {
    super(props);

    const templatedUrl = urlTemplate.parse(props.repo.issues_url).expand({});
    this.url = getProxyUrl(templatedUrl);
  }

  public componentDidMount () {
    this.props.getIssues({url: this.url});
  }

  public render () {
    const { repo, issues: { loading, data } } = this.props;
    const details = [];
    const issues = data && data[this.url];

    if (repo.permissions.admin) {
      details.push('Admin');
    }

    if (repo.fork) {
      details.push('Fork');
    }

    return (
      <ContentBox component="li">
        <SpacedGroup component="p">
          <a className="bold" href={repo.svn_url}>
            {repo.full_name}
          </a>
          {
            Boolean(details.length) && (
              <span className="font-size-small">
                ({details.join(', ')})
              </span>
            )
          }
          {
            Boolean(repo.homepage) && (
              <a className="font-size-small" href={repo.homepage}>
                Homepage
              </a>
            )
          }
        </SpacedGroup>
        {
          issues && (
            <ul className="list-style-none">
              {
                issues.map((issue) => (
                  <li key={issue.id}>
                    <a href={`${repo.svn_url}/issues/${issue.number}`}>
                      {issue.title}
                    </a>
                  </li>
                ))
              }
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
      </ContentBox>
    );
  }
}

export const mapStateToProps = ({issues}: StoreState): StateProps => {
  return {
    issues,
  };
};

export default connect(mapStateToProps, {getIssues})(RepoItem);
