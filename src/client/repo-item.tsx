import { ContentBox, SpacedGroup } from '@dabapps/roe';
import React, { PureComponent } from 'react';

import { Repo } from '^/client/types';

interface OwnProps {
  repo: Repo;
}

type Props = OwnProps;

class RepoItem extends PureComponent<Props> {
  public render () {
    const { repo } = this.props;
    const details = [];

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
      </ContentBox>
    );
  }
}

export default RepoItem;
