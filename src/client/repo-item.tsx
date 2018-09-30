import { Badge, Collapse, ContentBox, SpacedGroup } from '@dabapps/roe';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import urlTemplate from 'url-template';

import { getIssues, toggleRepoCollapse } from '^/client/actions';
import IssueItem from '^/client/issue-item';
import { StoreState } from '^/client/store';
import { Repo } from '^/client/types';
import { getProxyUrl } from '^/client/utils';

interface OwnProps {
  repo: Repo;
}

type StateProps = Pick<StoreState, 'issues' | 'collapsedRepos'>;

interface DispatchProps {
  getIssues: typeof getIssues;
  toggleRepoCollapse: typeof toggleRepoCollapse;
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
    const { repo, issues: { loadingUrls, data }, collapsedRepos } = this.props;
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
        <SpacedGroup className="float-right margin-vertical-large margin-left-base">
          {
            Boolean(loadingUrls && loadingUrls.indexOf(this.url) >= 0) && (
              <span>
                Loading...
              </span>
            )
          }
          {
            issues && (
              <Badge
                className={classNames('clickable', {error: issues.length})}
                onClick={this.onToggleCollapse}
              >
                {issues && `${collapsedRepos.has(repo.id) ? 'View' : 'Hide'} ${issues.length}`}
              </Badge>
            )
          }
        </SpacedGroup>
        <SpacedGroup block className="margin-vertical-large break-word">
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
        <Collapse open={!collapsedRepos.has(repo.id)} maxCollapsedHeight={0}>
          {
            issues && (
              <ul className="list-style-none">
                {
                  issues.length ? issues.map((issue) => <IssueItem key={issue.id} issue={issue} />) : (
                    <li>
                      No issues
                    </li>
                  )
                }
              </ul>
            )
          }
          {
            loadingUrls && loadingUrls.indexOf(this.url) >= 0 && (
              <p>
                Loading...
              </p>
            )
          }
        </Collapse>
      </ContentBox>
    );
  }

  private onToggleCollapse = () => {
    this.props.toggleRepoCollapse(this.props.repo.id);
  }
}

export const mapStateToProps = ({issues, collapsedRepos}: StoreState): StateProps => {
  return {
    issues,
    collapsedRepos,
  };
};

export default connect(mapStateToProps, {getIssues, toggleRepoCollapse})(RepoItem);
